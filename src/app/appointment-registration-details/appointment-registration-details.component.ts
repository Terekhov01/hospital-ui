import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appointment-registration-details',
  templateUrl: './appointment-registration-details.component.html',
  styleUrls: ['./appointment-registration-details.component.css']
})
export class AppointmentRegistrationDetailsComponent implements OnInit {

  id: bigint;
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();

  constructor(private route: ActivatedRoute, public datePipe: DatePipe,
              private appointmentRegistrationService: AppointmentRegistrationService) { }

  ngOnInit(): void {
    this.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
    this.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", "", "", "", "", "", "")
    this.id = this.route.snapshot.params['id'];
    this.appointmentRegistrationService.getAppointmentRegistrationByID(this.id).subscribe(data => {
      this.appointmentRegistration = data;
    })
  }

}
