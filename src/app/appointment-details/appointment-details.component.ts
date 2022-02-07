import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "../appointment";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistration} from "../appointment-registration";
import {DatePipe} from "@angular/common";
import {PatientService} from "../patient.service";
import * as printJS from "print-js";
import { saveAs } from 'file-saver';
// import {DomSanitizationService} from '@angular/platform-browser';
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {


  id: number;
  appointment: Appointment = new Appointment();
  files: any[] = [];
  fileURL: string;

  public page = 2;
  public pageLabel!: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private appointmentService: AppointmentService, public datePipe: DatePipe, private patientService: PatientService) { }

  ngOnInit(): void {
    // this.appointment.doctor = new Doctor("");
    // this.appointment.patient = new Patient("");
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.id = this.route.snapshot.params['id'];

    // WebViewer({
    //   path: '../assets/lib',
    //   initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    // }, this.viewerRef.nativeElement).then(instance => {
    //
    // });


    this.appointmentService.getAppointmentByID(this.id).subscribe(data => {
      this.appointment = data;
    })

  }

  goToFileViewer(id: number) {
    console.log("passing id: " + id)
    let res = this.router.navigate(['file-viewer', id])
  }

  printRecipe(id: number) {
    this.patientService.printRecipe(id).subscribe(data => {
      const blobUrl = URL.createObjectURL(data);
      printJS(blobUrl);
      // const iframe = document.createElement('iframe');
      // iframe.style.display = 'none';
      // iframe.src = blobUrl;
      // document.body.appendChild(iframe);
      // iframe.contentWindow.print();
    })
  }

}
