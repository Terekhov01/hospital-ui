import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentService, public datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  private getAppointments() {
    this.appointmentService.getAppointmentsList().subscribe(data => {
      this.appointments = data;
    })
  }

  updateAppointment(id: number) {
    let result = this.router.navigate(['update-appointment', id]);
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(data => {
      console.log(data);
      this.getAppointments();
    })
  }

  appointmentDetails(id: number) {
    let result = this.router.navigate(['appointment-details', id]);
  }

}
