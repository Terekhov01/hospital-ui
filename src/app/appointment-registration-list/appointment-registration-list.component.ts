import { Component, OnInit } from '@angular/core';
import { AppointmentRegistration } from "../appointment-registration";
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-registration-list',
  templateUrl: './appointment-registration-list.component.html',
  styleUrls: ['./appointment-registration-list.component.css']
})
export class AppointmentRegistrationListComponent implements OnInit {

  appointmentRegistrations: AppointmentRegistration[] = [];

  constructor(private appointmentRegistrationService: AppointmentRegistrationService,
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
    this.appointmentRegistrationService.getAppointmentRegistrationsList().subscribe(data => {
      this.appointmentRegistrations = data;
    })
  }

  updateAppointmentRegistration(id: number) {
    let result = this.router.navigate(['update-appointment-registration', id]);
  }

  deleteAppointmentRegistration(id: number) {
    this.appointmentRegistrationService.deleteAppointmentRegistration(id).subscribe(data => {
      console.log(data);
      this.getAppointmentRegistrations();
    })
  }

  appointmentRegistrationDetails(id: number) {
    let result = this.router.navigate(['appointment-registration-details', id]);
  }

}
