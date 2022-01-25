import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {DoctorService} from "../_services/doctor.service";
import {PatientService} from "../patient.service";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {

  appointment: Appointment = new Appointment();
  id: number;

  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router) { }

  ngOnInit(): void {
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.id = this.route.snapshot.params['id'];
    this.appointmentService.getAppointmentByID(this.id).subscribe(data => {
      this.appointment = data;
    },
      error => console.log(error));
  }

  updateAppointment(){
    this.appointmentService.updateAppointment(this.id, this.appointment)
      .subscribe(data=>{
        console.log(data);
        this.appointment = new Appointment();
        this.goToAppointmentList();
      }, error => console.log(error));

  }

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
  }

  onSubmit() {
    console.log(this.appointment);
    this.updateAppointment();
  }

}
