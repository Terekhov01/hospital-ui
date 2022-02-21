import { Component, OnInit } from '@angular/core';
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationInfoService} from "../appointment-registration-info.service";
import {
  DoctorScheduleAppointmentsDataDaily,
  ScheduleInterval
} from "../schedule-transfer-data/schedule-appointment.data-transfer-objects";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {DoctorService} from "../_services/doctor.service";
import {ServiceFormControls} from "./sevice-form-controls";
import {ServiceServiceService} from "../service-service.service";
import {Service} from "../service";
import {User} from "../user";
import {TokenStorageService} from "../_services/token-storage.service";
import {DatePipe} from "@angular/common";
import {PatientService} from "../patient.service";
import {DoctorScheduleService} from "../_services/doctor-schedule.service";

@Component({
  selector: 'app-create-appointment-registration',
  templateUrl: './create-appointment-registration.component.html',
  styleUrls: ['./create-appointment-registration.component.css'],
})
export class CreateAppointmentRegistrationComponent implements OnInit {

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


  constructor(private appointmentRegistrationService: AppointmentRegistrationService, private activatedRoute: ActivatedRoute, private serviceService: ServiceServiceService,
              private router: Router, private doctorService: DoctorService, public appointmentRegistrationInfoService: AppointmentRegistrationInfoService,
              private tokenStorageService: TokenStorageService, public datePipe: DatePipe, private patientService: PatientService, private doctorScheduleService: DoctorScheduleService) { }

  ngOnInit(): void {
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
    this.dateTime = str.substr(0, 10) + " " + str.substr(11,5);;
    let serviceSubject = new BehaviorSubject<Service[]>([]);
    this.serviceSubscription = this.serviceService.getServicesList().subscribe(
      {
        next: (IServiceArray) =>
        {
          let serviceArray = <Service[]>([]);
          console.log("IserviceArray size 1: " + IServiceArray.length)
          for (let service of IServiceArray)
          {
            serviceArray.push(new Service(service.serviceName));
          }
          serviceSubject.next(serviceArray);
        },
        error: (error) =>
        {
          alert(error.error);
        },
        complete: () =>
        {
          this.serviceFormControl.setServiceList(serviceSubject);
        }
      });
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
        this.goToAppointmentRegistragtionList();
      },
      error => console.log(error));
  }

  goToAppointmentRegistragtionList() {
    this.doctorScheduleService.markScheduleIntervalAsAssigned(this.doc_id, this.appointmentRegistration.start).subscribe(response => {});
    this.router.navigate(['/appointmentRegistrations']);
  }

  onSubmit() {
    console.log(this.appointmentRegistration);
    this.saveAppointmentRegistration();
  }

}
