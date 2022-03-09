import {DatePipe, KeyValue} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, interval, Observable, of, Subscription} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonUtilsService } from '../_services/common-utils.service';

import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../_services/doctor-shared-short-information.service';
import { FilterSettings } from '../schedule-filter/schedule-filter.filter-settings';
import { IDoctorScheduleAppointmentsData, DoctorScheduleAppointmentsDataDaily, ScheduleInterval } from '../schedule-transfer-data/schedule-appointment.data-transfer-objects';
import { AppointmentRegistrationInfoService } from "../appointment-registration-info.service";
import {ActivatedRoute, Router} from "@angular/router";
import { PopUpMessageService } from '../_services/pop-up-message.service';
import {User} from "../user";
import {AppointmentRegistration} from "../appointment-registration";
import {ServiceFormControls} from "../create-appointment-registration/sevice-form-controls";
import {Doctor} from "../doctor";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {ServiceServiceService} from "../service-service.service";
import {DoctorService} from "../_services/doctor.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {PatientService} from "../patient.service";
import {Patient} from "../patient";
import {Service} from "../service";

@Component({
  selector: 'app-schedule-appointment-block',
  templateUrl: './schedule-appointment-block.component.html',
  styleUrls: ['./schedule-appointment-block.component.css']
})
export class ScheduleAppointmentBlockComponent implements OnInit
{
    //Initializing with NaN to prevent possible errors of accessing uninitialized instance
    public requestedInformation: FilterSettings = new FilterSettings(NaN, new Date(), new Date());
    private doctorShortInformationSubscription: Subscription | undefined;
    private doctorAppointmentDataSubscription: Subscription | undefined;

    public doctorScheduleDailyAppointmentsArray: DoctorScheduleAppointmentsDataDaily[] = [];

    //------------------------------------------------------------------------------------------------------------------

    doctor: string;
    patient: string;
    user: User;
    appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();
    public info: DoctorScheduleAppointmentsDataDaily;
    public interval: ScheduleInterval;
    public serviceFormControl: ServiceFormControls = new ServiceFormControls();
    docName: Subscription | undefined;
    private serviceSubscription: Subscription | undefined;
    doc: Observable<Doctor>;
    doc_id: bigint;
    public dateTime: string;

    isInitiated: boolean;

    constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService, public utilsService: CommonUtilsService,
                private appointmentRegistrationInfoService: AppointmentRegistrationInfoService, private router: Router,
                private popUpMessageService: PopUpMessageService, private appointmentRegistrationService: AppointmentRegistrationService, private activatedRoute: ActivatedRoute, private serviceService: ServiceServiceService,
                private doctorService: DoctorService, private tokenStorageService: TokenStorageService, public datePipe: DatePipe, private patientService: PatientService,
                private modalService: NgbModal)
    {}

    ngOnInit(): void
    {
      this.isInitiated = false;
        this.doctorShortInformationSubscription = this.doctorShortInfoService.sharedRequestedInformationAsObservable.subscribe(
        {
            next: sharedInformation =>
            {
                this.requestedInformation = sharedInformation;
                this.presentAppointmentDates();
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert("Internal error. \
                //            Failed loading available appointments data to ScheduleAppointmentBlockComponent. \
                //            Cannot invoke presentAppointmentDates method.")
            }
        });
    }

    presentAppointmentDates(): void
    {
        if (isNaN(this.requestedInformation.getId()))
        {
            return;
        }

        let appointmentDataObservables = this.doctorScheduleService.getDoctorScheduleAppointmentDataObservables(
                                    this.requestedInformation.getId(),
                                    this.requestedInformation.getStartDate(),
                                    this.requestedInformation.getEndDate(),
                                    true);

        this.doctorAppointmentDataSubscription = appointmentDataObservables/*.pipe(
            catchError((error) =>
            {
                console.error();
                alert("Server inacessible or data malformed! Cannot load available appointment dates.");
                return of([]);
            })
        ).*/.subscribe(
        {
            next: (doctorAppointmentsData) =>
            {
                let doctorScheduleAppointmentsSubjects = new BehaviorSubject<IDoctorScheduleAppointmentsData[]>([]);
                doctorScheduleAppointmentsSubjects.next(doctorAppointmentsData);

                //Here we assume that there is only one doctor contained in responce from server. Function on server is capable
                //of sending msny doctors' info, but we want to present data nicely so we create a request and recieve data of
                //the only doctor. Next if statement checks if server responds with relative information.
                if (doctorScheduleAppointmentsSubjects.value.length > 1)
                {
                    this.popUpMessageService.displayWarning("Ответ сервера неверен: он содержит информацию о нескольких докторах. Вся информация не может быть обработана.\
                    Показывается только информация о первом докторе");
                    //alert("Server responce is invalid - multiple doctors' information recieved. Parsing first doctor.");
                }

                if (doctorScheduleAppointmentsSubjects.value.length === 0)
                {
                    this.popUpMessageService.displayWarning("Нет доступного для записи времени");
                    //alert("Нет доступного для записи времени");
                }

                let doctorScheduleAppointments = doctorScheduleAppointmentsSubjects.value[0];

                let intervalCounter = 0;
                let curDate = new Date(this.requestedInformation.getStartDate());
                let intervalArray: ScheduleInterval[] = [];
                let curInterval: ScheduleInterval;

                while (curDate <= this.requestedInformation.getEndDate() && intervalCounter < doctorScheduleAppointments.intervalCollection.length)
                {
                    curInterval = new ScheduleInterval(doctorScheduleAppointments.intervalCollection[intervalCounter])
                    if (datesHaveSameYearMonthAndDate(curDate, curInterval.getIntervalStartTime()))
                    {
                        intervalArray.push(curInterval);
                        intervalCounter++;
                    }
                    else
                    {
                        if (intervalArray.length !== 0)
                        {
                            let doctorScheduleDailyAppointments = new DoctorScheduleAppointmentsDataDaily(doctorScheduleAppointments, new Date(curDate));
                            doctorScheduleDailyAppointments.setIntervalCollection(intervalArray);

                            this.doctorScheduleDailyAppointmentsArray.push(doctorScheduleDailyAppointments);
                            intervalArray = [];
                        }

                        curDate.setDate(curDate.getDate() + 1);
                    }
                }

                if (intervalArray.length !== 0)
                {
                    let doctorScheduleDailyAppointments = new DoctorScheduleAppointmentsDataDaily(doctorScheduleAppointments, new Date(curDate));
                    doctorScheduleDailyAppointments.setIntervalCollection(intervalArray);
                    this.doctorScheduleDailyAppointmentsArray.push(doctorScheduleDailyAppointments);
                }
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert(error.error);
            },
            complete: () =>
            {
                console.log("Recieving information successful");
            }
        });
    }

    selectDateTime(content, dateTime: Date) {
      this.isInitiated = false;
      console.log("In select date time method");
      console.log("Date time is: ")
      this.modalService.open(content, { size: 'xl', centered: true });
      this.appointmentRegistrationInfoService.changeDate(dateTime);
      this.initModalContent();
      // this.isInitiated = true;
      // this.router.navigate(['/create-appointment-registration'])
    }

    async initModalContent() {
      this.appointmentRegistration = new AppointmentRegistration();
      this.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
      this.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", this.patient, "", "", "", "", "")
      this.user = this.tokenStorageService.getUser();
      let usr_id = window.sessionStorage.getItem("USER_ID")
      console.log("Current user is: " + usr_id);
      let user_id = BigInt(usr_id);
      this.patientService.getPatientById(user_id).subscribe(data => {
        this.appointmentRegistration.patient = data;
        console.log("RECEIVED INFORMATION ABOUT PATIENT: " + data)
      })
      this.appointmentRegistrationInfoService.id.subscribe(id => {
        this.doc_id = id;
      });
      console.log("DOC ID RECEIVED: " + this.doc_id);
      this.patientService.getDoctorById(this.doc_id).subscribe(data => {
        this.appointmentRegistration.doctor = data
      })
      console.log("RECEIVED DOCTOR: " + this.appointmentRegistration.doctor.user.lastName)
      this.appointmentRegistrationInfoService.date.subscribe(data => {
        this.appointmentRegistration.start = data
      });
      console.log("Date received: " + this.appointmentRegistration.start.toISOString())
      let str = this.appointmentRegistration.start.toISOString();
      this.dateTime = str.substr(0, 10) + " " + str.substr(11, 5);


      let serviceSubject = new BehaviorSubject<Service[]>([]);
      this.serviceSubscription = this.serviceService.getServicesList().subscribe(
        {
          next: (IServiceArray) => {
            let serviceArray = <Service[]>([]);
            console.log("IserviceArray size 1: " + IServiceArray.length)
            for (let service of IServiceArray) {
              serviceArray.push(new Service(service.serviceName));
            }
            serviceSubject.next(serviceArray);
          },
          error: (error) => {
            this.popUpMessageService.displayError(error);
            //alert(error.error);
          },
          complete: () => {
            this.serviceFormControl.setServiceList(serviceSubject);
          }
        });
      console.log("Before delay")
      await delay(1500);
      console.log("After delay")
      this.isInitiated = true;
    }

  saveAppointmentRegistration() {
    this.appointmentRegistration.room = this.appointmentRegistration.doctor.room.num.toString();
    this.appointmentRegistration.address = this.appointmentRegistration.doctor.room.phone;
    console.log("Saving appointment registration")
    console.log("Size of array: " + this.serviceFormControl.ServiceFiltered.value.length)

    if (this.serviceFormControl.ServiceFormControl.valid) {
      console.log("valid")
    } else {
      console.log("invalid")
    }

    for (let service of this.serviceFormControl.ServiceFiltered.value)
    {
      console.log("Service: " + service.serviceName)
      if (service.toString() === this.serviceFormControl.ServiceFormControl.value)
      {
        this.appointmentRegistration.service = service.serviceName;
      }
    }

    this.appointmentRegistrationService.createAppointmentRegistration(this.appointmentRegistration).subscribe(data => {
        console.log(data);
        this.modalService.dismissAll();
        this.goToAppointmentRegistrationList();
      },
      error => {
      this.modalService.dismissAll();
      console.log(error)});
  }

  goToAppointmentRegistrationList() {
    this.doctorScheduleService.updateIntervalIsAssigned(this.doc_id, "true", this.appointmentRegistration.start).subscribe(response => {});
    this.router.navigate(['/appointmentRegistrations']);
  }

  onSubmit() {
    console.log(this.appointmentRegistration);
    this.saveAppointmentRegistration();
  }

    /*debugger(value: any, value2: any): boolean
    {
        return true;
    }*/
}

function datesHaveSameYearMonthAndDate(first: Date, second: Date): boolean
{
    if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate())
    {
        return true;
    }
    return false;
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
