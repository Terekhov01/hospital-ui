import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentService, public datePipe: DatePipe,
              private router: Router,
              private popUpMessageService: PopUpMessageService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  private getAppointments() {
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_DOCTOR") {
      this.appointmentService.getDoctorAppointments(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointments = data;
      })
    } else if (usr_role == "ROLE_PATIENT") {
      this.appointmentService.getPatientAppointments(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.appointments = data;
      })
    } else {
      this.popUpMessageService.displayError("Ошибка авторизации. Войдите на сайт");
      //alert("ERROR: UNAUTHORIZED")
    }
  }

  updateAppointment(id: bigint) {
    let result = this.router.navigate(['update-appointment', id]);
  }

  deleteAppointment(id: bigint) {
    this.appointmentService.deleteAppointment(id).subscribe(data => {
      console.log(data);
      this.getAppointments();
    })
  }

  appointmentDetails(id: bigint) {
    let result = this.router.navigate(['appointment-details', id]);
  }

}
