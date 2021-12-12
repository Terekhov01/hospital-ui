import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistration} from "../appointment-registration";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  id: number;
  appointment: Appointment = new Appointment();

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService, public datePipe: DatePipe,) { }

  ngOnInit(): void {
    // this.appointment.doctor = new Doctor("");
    // this.appointment.patient = new Patient("");
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.id = this.route.snapshot.params['id'];
    this.appointmentService.getAppointmentByID(this.id).subscribe(data => {
      this.appointment = data;
    })
  }

}
