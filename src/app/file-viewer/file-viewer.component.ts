import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {DatePipe} from "@angular/common";
import {PatientService} from "../patient.service";
import { saveAs } from 'file-saver';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {

  fileURL: string;
  safeURL: SafeResourceUrl;
  id: number;
  // public page = 2;
  // public pageLabel!: string;

  constructor(private route: ActivatedRoute, private router: Router, public sanitizer:DomSanitizer,
              private appointmentService: AppointmentService, public datePipe: DatePipe, private patientService: PatientService) { }


  ngOnInit(): void {
    let frame = document.getElementById('frame') as HTMLIFrameElement;
    // let obj = document.getElementById('object') as HTMLObjectElement;
    // let docViewer = document.getElementById('docViewer') as HTMLAreaElement
    this.id = this.route.snapshot.params['id'];
    this.patientService.download(this.id).subscribe(data => {
      this.fileURL = URL.createObjectURL(data)
      // docViewer.href = URL.createObjectURL(data)
      // frame.src = "http://localhost:8080/api/files/download/291"
      // obj.data = URL.createObjectURL(data);
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);
      // this.safeURL = this.sanitizer.sanitize(SecurityContext.URL, this.safeURL);
      console.log(data.type)
      // this.fileURL = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
      // this.fileURL = "http://localhost:8080/api/files/download/291";

      console.log(this.fileURL)
      console.log(this.safeURL)
    })
  }

  backToDetails(id: number) {
    this.router.navigate(['appointment-details', id])
  }

  downloadFiles() {
    this.patientService.download(this.id).subscribe(blob => saveAs(blob, "attachment.pdf"))
  }

}
