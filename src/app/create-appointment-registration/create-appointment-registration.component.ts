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
} from "../schedule-appointment-block/schedule-appointment.i-raw-data";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {DoctorService} from "../_services/doctor.service";
import {ServiceFormControls} from "./sevice-form-controls";
import {ServiceServiceService} from "../service-service.service";
import {Service} from "../service";
import {FilterSettings} from "../schedule-filter/schedule-filter.filter-settings";

@Component({
  selector: 'app-create-appointment-registration',
  templateUrl: './create-appointment-registration.component.html',
  styleUrls: ['./create-appointment-registration.component.css'],
  // providers: [AppointmentRegistrationInfoService]
})
export class CreateAppointmentRegistrationComponent implements OnInit {

  doctor: string;
  patient: string;
  // services: string[] = ["Запись к терапевту", "Сдача крови"];
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();
  public info: DoctorScheduleAppointmentsDataDaily;
  public interval: ScheduleInterval;
  public serviceFormControl: ServiceFormControls = new ServiceFormControls();
  // state$: Observable<DoctorScheduleAppointmentsDataDaily>;
  docName: Subscription | undefined;
  private serviceSubscription: Subscription | undefined;
  doc: Observable<Doctor>;
  // docInfo: Doctor;


  constructor(private appointmentRegistrationService: AppointmentRegistrationService, private activatedRoute: ActivatedRoute, private serviceService: ServiceServiceService,
              private router: Router, private doctorService: DoctorService, public appointmentRegistrationInfoService: AppointmentRegistrationInfoService) { }

  ngOnInit(): void {
    this.appointmentRegistration = new AppointmentRegistration();
    this.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
    this.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", this.patient, "", "", "", "", "")
    // this.appointmentRegistration.doctor = new Doctor("No name", "specialization", "Address", "Room");
    // this.state$ = this.activatedRoute.paramMap.pipe(map(() =>window.history.state))
    // this.state$.subscribe(data => {
    //   console.log(typeof data);
    // }, error => {
    //   console.log(error)
    // });
    // this.info = this.appointmentRegistrationInfoService.info;
    // this.interval = this.appointmentRegistrationInfoService.interval;
    // console.log("Doctor name: " + this.info.getDoctorName());
    // console.log("Date" + this.info.getDate().toISOString());
    // console.log("info: " + window.history.state.info.getSpecializationName());
    // console.log("Info: " + this.appointmentRegistrationInfoService.getDoctorName())
    // this.docName = this.appointmentRegistrationInfoService.doctorName.subscribe(data => {
    //   this.doctor = data;
    //   console.log("RECIEVED DATA IS: " + data)
    //   console.log("DOCTOR IS: " + this.doctor)
    // })
    this.appointmentRegistrationInfoService.doctorName.subscribe(name => this.doctor = name)
    // this.doc = this.doctorService.getDoctorByLastName(this.doctor);
    // this.doc.subscribe(data => this.docInfo);
    this.doctorService.getDoctorByLastName(this.doctor).subscribe(data => {
        // this.appointment.doctor = data;
        this.appointmentRegistration.doctor = data;
        console.log("In subscription data: " + data);
      },
      error => console.log(error));

    console.log("DOCTOR IS: " + this.doctor)
    // console.log("Doc Service: " + this.docInfo.lastName)
    // this.appointmentRegistration = new AppointmentRegistration();
    // this.appointmentRegistration.doctor = this.docInfo;
    this.appointmentRegistrationInfoService.intervalStartTime.subscribe(data => this.appointmentRegistration.start = data)



    let serviceSubject = new BehaviorSubject<Service[]>([]);
    //Subscribe to doctor short information (includes name, specialization and id)
    this.serviceSubscription = this.serviceService.getServicesList()/*.pipe(
      catchError((error) =>
      {
        console.error();
        alert("Server inacessible or data malformed! Cannot load list of doctors available.");
        return of([]);
      })
    )*/.subscribe(
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
          //alert("Error translating data from server! Cannot load list of doctors available.");
          //console.error();
        },
        complete: () =>
        {
          /*console.log("Recieving information successful");
          console.log("serviceSubject array size: " + serviceSubject.value.length)*/
          this.serviceFormControl.setServiceList(serviceSubject);
        }
      });


  }

  saveAppointmentRegistration() {
    this.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
    this.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", this.patient, "", "", "", "", "")
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
      // console.log("Array: " + this.serviceFormControl.ServiceFormControl.value.serviceName)
      if (service.toString() === this.serviceFormControl.ServiceFormControl.value)
      {
        //After this function executes appointment forms pop up. See doctor-shared-short-information service
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
    this.router.navigate(['/appointmentRegistrations']);
  }

  onSubmit() {
    console.log(this.appointmentRegistration);
    this.saveAppointmentRegistration();
  }

}
