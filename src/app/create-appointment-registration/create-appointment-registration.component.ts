import { Component, OnInit } from '@angular/core';
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";

@Component({
  selector: 'app-create-appointment-registration',
  templateUrl: './create-appointment-registration.component.html',
  styleUrls: ['./create-appointment-registration.component.css']
})
export class CreateAppointmentRegistrationComponent implements OnInit {

  doctor: string;
  patient: string;
  services: string[] = ["Запись к терапевту", "Сдача крови"];
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();

  constructor(private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveAppointmentRegistration() {
    this.appointmentRegistration.doctor = new Doctor(this.doctor);
    this.appointmentRegistration.patient = new Patient(this.patient);
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
