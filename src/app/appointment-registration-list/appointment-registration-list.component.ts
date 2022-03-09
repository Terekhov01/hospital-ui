import { Component, OnInit } from '@angular/core';
import { AppointmentRegistration } from "../appointment-registration";
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DoctorScheduleService} from "../_services/doctor-schedule.service";
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-appointment-registration-list',
  templateUrl: './appointment-registration-list.component.html',
  styleUrls: ['./appointment-registration-list.component.css']
})
export class AppointmentRegistrationListComponent implements OnInit {

  appointmentRegistrations: AppointmentRegistration[] = [];
  dateString: string;

  constructor(private appointmentRegistrationService: AppointmentRegistrationService, public datePipe: DatePipe,
              private router: Router, private doctorScheduleService: DoctorScheduleService,
              private popUpMessageService: PopUpMessageService) { }

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
      this.popUpMessageService.displayError("Ошибка авторизации. Войдите на сайт");
      //alert("ERROR: UNAUTHORIZED")
    }
  }

  updateAppointmentRegistration(id: bigint) {
    let result = this.router.navigate(['update-appointment-registration', id]);
  }

  deleteAppointmentRegistration(appointmentRegistration: AppointmentRegistration) {
    this.doctorScheduleService.updateIntervalIsAssigned(appointmentRegistration.doctor.user.id, "false", appointmentRegistration.start).subscribe(response => {});
    this.appointmentRegistrationService.deleteAppointmentRegistration(BigInt(appointmentRegistration.id)).subscribe(data => {
      console.log(data);
      this.getAppointmentRegistrations();
    })
  }

  appointmentRegistrationDetails(id: bigint) {
    let result = this.router.navigate(['appointment-registration-details', id]);
  }

}
