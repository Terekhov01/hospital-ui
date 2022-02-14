import { Component, OnInit } from '@angular/core';
import { AppointmentRegistration } from "../appointment-registration";
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appointment-registration-list',
  templateUrl: './appointment-registration-list.component.html',
  styleUrls: ['./appointment-registration-list.component.css']
})
export class AppointmentRegistrationListComponent implements OnInit {

  appointmentRegistrations: AppointmentRegistration[] = [];

  constructor(private appointmentRegistrationService: AppointmentRegistrationService, public datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.getAppointmentRegistrations();
  }

  private getAppointmentRegistrationByDocAndPat(doc: string, pat: string) {
    this.appointmentRegistrationService.getAppointmentRegistrationByDocAndPat(doc, pat).subscribe(data => {
      this.appointmentRegistrations.push(data);
    })
  }

  private getAppointmentRegistrations() {
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_PATIENT") {
      this.appointmentRegistrationService.getPatientAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointmentRegistrations = data;
      })
    } else if (usr_role == "ROLE_DOCTOR") {
      this.appointmentRegistrationService.getDoctorAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointmentRegistrations = data;
      })
    } else {
      alert("ERROR: UNAUTHORIZED")
    }
  }

  updateAppointmentRegistration(id: bigint) {
    let result = this.router.navigate(['update-appointment-registration', id]);
  }

  deleteAppointmentRegistration(id: bigint) {
    this.appointmentRegistrationService.deleteAppointmentRegistration(id).subscribe(data => {
      console.log(data);
      this.getAppointmentRegistrations();
    })
  }

  appointmentRegistrationDetails(id: bigint) {
    let result = this.router.navigate(['appointment-registration-details', id]);
  }

}
