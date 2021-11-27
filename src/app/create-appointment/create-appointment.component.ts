import { Component, OnInit } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DoctorService} from "../doctor.service";
import {PatientService} from "../patient.service";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  appointment: Appointment = new Appointment();
  start: Date;
  end: Date;
  address: string;
  room: string;
  doctor: string;
  patient: string
  appointmentRegistrations: AppointmentRegistration[];

  constructor(private appointmentService: AppointmentService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router) { }

  ngOnInit(): void {
    this.appointmentRegistrationService.getAppointmentRegistrationsList().subscribe(data => {
      this.appointmentRegistrations = data;
    })
  }

  saveAppointment() {
    // this.appointment.doctor = new Doctor(this.doctor);
    // this.appointment.patient = new Patient(this.patient);
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.appointment.appointmentRegistration.doctor = new Doctor(this.doctor);
    this.appointment.appointmentRegistration.patient = new Patient(this.patient);
    this.doctorService.getDoctorByLastName(this.doctor).subscribe(data => {
      // this.appointment.doctor = data;
      this.appointment.appointmentRegistration.doctor = data;
      console.log(data);
    },
      error => console.log(error));
    this.patientService.getPatientByLastName(this.patient).subscribe( data => {
      // this.appointment.patient = data;
      this.appointment.appointmentRegistration.patient = data;
      console.log(data);
    },
      error => console.log(error));
    this.appointmentRegistrationService.getAppointmentRegistrationByDocAndPat(this.doctor, this.patient).subscribe(data => {
        this.appointment.appointmentRegistration = data;
        console.log(data);
      },
      error => console.log(error));
    this.appointment.appointmentRegistration.room = this.room;
    this.appointment.appointmentRegistration.address = this.address;
    this.appointment.appointmentRegistration.start = this.start;
    this.appointment.appointmentRegistration.end = this.end;
    this.appointmentService.createAppointment(this.appointment).subscribe(data => {
      console.log(data);
      this.goToAppointmentList();
    },
      error => console.log(error));
  }

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
  }

  SelectAppointmentRegistration(id: number) {
    let result = this.router.navigate(['appointment-creation', id]);
  }

  onSubmit() {
    console.log(this.appointment);
    this.saveAppointment();
  }

}
