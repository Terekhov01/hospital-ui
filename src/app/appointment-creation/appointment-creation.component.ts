import { Component, OnInit, EventEmitter  } from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DoctorService} from "../_services/doctor.service";
import {PatientService} from "../patient.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.css']
})
export class AppointmentCreationComponent implements OnInit {

  appointment: Appointment = new Appointment();
  start: Date;
  end: Date;
  address: string;
  room: string;
  doctor: string;
  patient: string
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();
  id: number;
  file: Blob;
  files: Blob[] = [];

  fileToUpload: File | null = null;

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
    })
  }

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
  }

  saveAppointment() {
    this.appointment.appointmentRegistration = this.appointmentRegistration;
    this.appointment.appointmentRegistration.room = this.room;
    this.appointment.appointmentRegistration.address = this.address;
    this.appointment.appointmentRegistration.start = this.start;
    this.appointment.appointmentRegistration.end = this.end;


    // this.patientService.uploadFile(this.file, this.appointmentRegistration.patient.id).subscribe(data => {
    //   console.log(data);
    // });
    //
    // console.log(this.file);

    // this.files.push(this.file);
    //
    // this.onUploadFiles(this.files, this.appointmentRegistration.patient.id);

    this.patientService.postFile(this.fileToUpload!, this.appointment.appointmentRegistration.patient.id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

    this.appointmentService.createAppointment(this.appointment).subscribe(data => {
        console.log(data);
        this.goToAppointmentList();
      },
      error => console.log(error));
  }

  // onUploadFiles(files: Blob[], id: number): void {
  //   const formData = new FormData();
  //   for (const file of files) {
  //     formData.append('file', file, "file");
  //   }
  //   this.patientService.upload(formData, this.appointmentRegistration.patient.id).subscribe(
  //     event => {
  //       console.log(event);
  //
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

    onSubmit() {
    console.log(this.appointment);
    this.saveAppointment();
  }

}
