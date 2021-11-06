import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationService} from "../appointment-registration.service";

@Component({
  selector: 'app-appointment-registration-details',
  templateUrl: './appointment-registration-details.component.html',
  styleUrls: ['./appointment-registration-details.component.css']
})
export class AppointmentRegistrationDetailsComponent implements OnInit {

  id: number;
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();

  constructor(private route: ActivatedRoute,
              private appointmentRegistrationService: AppointmentRegistrationService) { }

  ngOnInit(): void {
    this.appointmentRegistration.doctor = new Doctor("");
    this.appointmentRegistration.patient = new Patient("");
    this.id = this.route.snapshot.params['id'];
    this.appointmentRegistrationService.getAppointmentRegistrationByID(this.id).subscribe(data => {
      this.appointmentRegistration = data;
    })
  }

}
