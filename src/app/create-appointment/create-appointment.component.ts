import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DoctorService} from "../_services/doctor.service";
import {PatientService} from "../patient.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  appointment: Appointment = new Appointment();
  start: Date;
  end: Date;
  address: string;
  room: string;
  doctor: string;
  patient: string
  appointmentRegistrations: AppointmentRegistration[];

  constructor(private appointmentService: AppointmentService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_DOCTOR") {
      this.appointmentRegistrationService.getDoctorAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointmentRegistrations = data;
      })
    } else if (usr_role == "ROLE_PATIENT") {
      this.appointmentRegistrationService.getPatientAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointmentRegistrations = data;
      })
    } else {
      alert("ERROR: UNAUTHORIZED")
    }
  }

  /*saveAppointment() {
    // this.appointment.doctor = new Doctor(this.doctor);
    // this.appointment.patient = new Patient(this.patient);
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.appointment.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
    this.appointment.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", this.patient, "", "", "", "", "")
    this.doctorService.getDoctorByLastName(this.doctor).subscribe({
      next: (data) => {
      // this.appointment.doctor = data;
      this.appointment.appointmentRegistration.doctor = data;
      console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.patientService.getPatientByLastName(this.patient).subscribe({
      next: (data) => {
      // this.appointment.patient = data;
      this.appointment.appointmentRegistration.patient = data;
      console.log(data);
      },
      error: error => console.log(error)
    });

    this.appointmentRegistrationService.getAppointmentRegistrationByDocAndPat(this.doctor, this.patient).subscribe({
      next: (data) => {
        this.appointment.appointmentRegistration = data;
        console.log(data);
      },
      error: (error) => console.log(error)
    });

    this.appointment.appointmentRegistration.room = this.room;
    this.appointment.appointmentRegistration.address = this.address;
    this.appointment.appointmentRegistration.start = this.start;
    this.appointment.appointmentRegistration.end = this.end;

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (data) => {
      console.log(data);
      this.goToAppointmentList();
      },
      error: (error) => console.log(error)
    });
  }*/

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
  }

  SelectAppointmentRegistration(id: number) {
    let result = this.router.navigate(['appointment-creation', id]);
  }

  /*onSubmit() {
    console.log(this.appointment);
    this.saveAppointment();
  }*/

}
