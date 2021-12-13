import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "../appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../doctor.service";
import {PatientService} from "../patient.service";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {AppointmentRegistration} from "../appointment-registration";

@Component({
  selector: 'app-update-appointment-registration',
  templateUrl: './update-appointment-registration.component.html',
  styleUrls: ['./update-appointment-registration.component.css']
})
export class UpdateAppointmentRegistrationComponent implements OnInit {

  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();
  id: number;

  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.appointmentRegistrationService.getAppointmentRegistrationByID(this.id).subscribe(data => {
        this.appointmentRegistration = data;
      },
      error => console.log(error));
  }

  updateAppointmentRegistration(){
    console.log(this.appointmentRegistration);
    this.appointmentRegistrationService.updateAppointmentRegistration(this.id, this.appointmentRegistration)
      .subscribe(data=>{
        console.log(data);
        this.appointmentRegistration = new AppointmentRegistration();
        this.goToAppointmentRegistrationList();
      }, error => console.log(error));

  }

  goToAppointmentRegistrationList() {
    this.router.navigate(['/appointmentRegistrations']);
  }

  onSubmit() {
    console.log(this.appointmentRegistration);
    this.updateAppointmentRegistration();
  }

}
