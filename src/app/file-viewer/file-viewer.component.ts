import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../appointment.service";
import {DatePipe} from "@angular/common";
import {PatientService} from "../patient.service";
import { saveAs } from 'file-saver';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { FileDTO } from '../file-transfer-data/file-transfer-data.data-transfer-object';

class FileResourceInfo
{
  fileName: string;
  fileUrl: string;
  mimetype: string;

  constructor(fileName: string, fileUrl: string, mimetype: string)
  {
    this.fileName = fileName;
    this.fileUrl = fileUrl;
    this.mimetype = mimetype;
  }
}

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit
{
  fileResources: FileResourceInfo[] = [];
  displayedFile: FileResourceInfo = null;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer,
              private appointmentService: AppointmentService, public datePipe: DatePipe, private patientService: PatientService) { }

  ngOnInit(): void
  {
    this.id = this.route.snapshot.params['id'];
    let downloadSubscription = this.patientService.download(this.id).subscribe(
    {
      next: (files: FileDTO[]) => 
      {
        for (let file of files)
        {
          let fileBlob = this.base64toBlob(file.content, file.mimetype);
          let fileResource = new FileResourceInfo(file.originalName, URL.createObjectURL(fileBlob), file.mimetype);
          this.fileResources.push(fileResource);

          // Open first file so page opens up nicely
          if (this.displayedFile == null && file.mimetype != "")
          {
            this.displayedFile = fileResource;
          }
        }
       },
      error: (error) =>
      {
        alert(error.error);
      },
      complete: () =>
      {
        downloadSubscription.unsubscribe();
      }
    })
  }

  backToDetails(id: number)
  {
    this.router.navigate(['appointment-details', id])
  }

  displayFile(file: FileResourceInfo)
  {
    this.displayedFile = file;
  }

  downloadFile(file: FileResourceInfo)
  {
    saveAs(file.fileUrl, file.fileName);
  }

  downloadAllFiles()
  {
    for (let file of this.fileResources)
    {
      this.downloadFile(file);
    }

    /*let downloadSubscription = this.patientService.download(this.id).subscribe({
      next: (files: FileDTO[]) => 
      {
        //let fileUrls: string[] = [];
        for (let file of files)
        {
          let fileBlob = this.base64toBlob(file.content, file.mimetype);
          let fileUrl = URL.createObjectURL(fileBlob);
          saveAs(fileUrl, file.originalName);
        }
      },
      error: (error) => 
      {
        alert(error.error);
      },
      complete: () =>
      {
        downloadSubscription.unsubscribe();
      }
    })*/
  }

  debug(value): boolean
  {
    console.log(value);
    return false;
  }

  base64toBlob(base64Data, contentType): Blob
  {
    var sliceSize = 1024;
    // I never expected type conversion to be so compicated
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
