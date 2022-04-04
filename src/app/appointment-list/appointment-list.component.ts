import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Appointment} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
import { PopUpMessageService } from '../_services/pop-up-message.service';
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import * as printJS from "print-js";
import {PatientService} from "../patient.service";
import {FileDTO} from "../file-transfer-data/file-transfer-data.data-transfer-object";
import {renderAsync} from "docx-preview";
import { saveAs } from 'file-saver';
import {NgbdSortableHeader} from "../create-appointment/sortable.directive";
import {AppointmentRegistration} from "../appointment-registration";
import {Patient} from "../patient";
import {Doctor} from "../doctor";
import {PageEvent} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./custom.mat.paginator.intl";
import {MatPaginatorIntl} from "@angular/material/paginator";

export type SortColumn = keyof AppointmentRegistration | '';
export type SortDirection = 'asc' | 'desc';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc' };

const compare = (v1: string | number | Date | Patient | Doctor, v2: string | number | Date | Patient | Doctor) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

class FileResourceInfo
{
  fileName: string;
  fileUrl: string;
  fileBlob: Blob;
  mimetype: string;
  creationDate: Date;

  constructor(fileName: string, fileBlob: Blob, mimetype: string, creationDate: Date)
  {
    this.fileName = fileName;
    this.fileBlob = fileBlob;
    this.fileUrl = URL.createObjectURL(fileBlob);
    this.mimetype = mimetype;
    this.creationDate = creationDate;
  }
}

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }]
})
export class AppointmentListComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  appointments: Appointment[];
  isLoaded: boolean;
  isEmpty: boolean;
  isTableLoaded: boolean;
  appointment: Appointment;
  activateLoadingModal: boolean;
  keyWord: string;
  lastPageSize: number;

  //----------------------------------------------------------------------------------------

  fileResources: FileResourceInfo[] = [];
  isRenderedFileDirty = true;
  displayedFile: FileResourceInfo = null;
  fileId: number;
  filesLoaded: boolean;
  totalElements: number;

  constructor(private appointmentService: AppointmentService, public datePipe: DatePipe,
              private router: Router, private modalService: NgbModal, private patientService: PatientService,
              private popUpMessageService: PopUpMessageService, config: NgbModalConfig,) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.keyWord = "";
    this.isTableLoaded = false;
    this.isEmpty = false;
    this.filesLoaded = false;
    this.activateLoadingModal = false;
    this.modalService.dismissAll();
    this.isLoaded = false;
    // this.getAppointments();
    this.lastPageSize = 3;
    this.getAppointmentsPage({ page: "0", size: "3", keyword: "" });
  }

  public async search() {
    console.log("keyword: " + this.keyWord)
    this.getAppointmentsPage({ page: "0", size: `${this.lastPageSize}`, keyword: this.keyWord })
  }

  public async reset() {
    this.keyWord = "";
    this.getAppointmentsPage({ page: "0", size: `${this.lastPageSize}`, keyword: "" })
  }

   private async getAppointmentsPage(request) {
    this.isTableLoaded = false;
    this.appointmentService.getDoctorAppointmentsPaged(BigInt(window.sessionStorage.getItem("USER_ID")), request)
      .subscribe(data => {
        this.appointments = data['content'];
        console.log("appointments null? " + this.appointments == null)
        console.log("appointments length =0? " + this.appointments.length)
        if (this.appointments == null || this.appointments.length == 0) {
          this.isEmpty = true;
        }
        this.totalElements = data['totalElements'];
        this.isTableLoaded = true;
        this.isLoaded = true;
      }, error => {
        console.log("appointments null? " + this.appointments == null)
        if (this.appointments == null || this.appointments.length == 0) {
          this.isEmpty = true;
        }
      });
    await delay(2000);
    // this.isTableLoaded = true;
    // this.isLoaded = true;
  }

  nextPage(event: PageEvent) {
    this.isTableLoaded = false;
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    request['keyword'] = this.keyWord;
    this.lastPageSize = event.pageSize;
    this.getAppointmentsPage(request);
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'desc';
      }
    });

    // if (direction === '' || column === '') {
    // } else {
    this.appointments = [...this.appointments].sort((a, b) => {
      const res = compare(a.appointmentRegistration[column], b.appointmentRegistration[column]);
      return direction === 'asc' ? res : -res;
    });
    // }
  }

  onSort1({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'desc';
      }
    });

    // if (direction === '' || column === '') {
    // } else {
    this.appointments = [...this.appointments].sort((a, b) => {
      const res = compare(a.appointmentRegistration.patient.user[column], b.appointmentRegistration.patient.user[column]);
      return direction === 'asc' ? res : -res;
    });
    // }
  }

  private getAppointments() {
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_DOCTOR") {
      this.appointmentService.getDoctorAppointments(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointments = data;
      })
    } else if (usr_role == "ROLE_PATIENT") {
      this.appointmentService.getPatientAppointments(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointments = data;
      })
    } else {
      this.popUpMessageService.displayError("Ошибка авторизации. Войдите на сайт");
      //alert("ERROR: UNAUTHORIZED")
    }
  }

  updateAppointment(id: bigint) {
    let result = this.router.navigate(['update-appointment', id]);
  }

  deleteAppointment(id: bigint) {
    this.appointmentService.deleteAppointment(id).subscribe(data => {
      console.log(data);
      this.getAppointments();
    })
  }

  appointmentDetails(content, id: bigint, a: Appointment) {
    this.appointment = a;
    this.modalService.open(content, { size: 'xl', centered: true, scrollable: true });
    // let result = this.router.navigate(['appointment-details', id]);
  }

  // goToFileViewer(content, id: bigint) {
  //   this.initFileViewer(id);
  //   this.modalService.open(content, { size: 'xl', centered: true, scrollable: true });
  //   console.log("passing id: " + id)
  //   // let res = this.router.navigate(['file-viewer', id])
  // }

  goToFileViewer1(id: bigint) {
    console.log("passing id: " + id)
    // let res = this.router.navigate(['file-viewer', id])
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['file-viewer', id])
    )
    window.open(url, '_blank');
  }

  printRecipe(content, id: bigint) {
    this.modalService.open(content, { size: 'sm', centered: true })
    this.patientService.printRecipe(id).subscribe(data => {
      const blobUrl = URL.createObjectURL(data);
      printJS(blobUrl);
      // const iframe = document.createElement('iframe');
      // iframe.style.display = 'none';
      // iframe.src = blobUrl;
      // document.body.appendChild(iframe);
      // iframe.contentWindow.print();
    })
    console.log("printed!!")
    window.onafterprint = () => console.log("ONAFTERPRINT")

    window.onbeforeprint = () => console.log('This will be called before the user prints.')
  }

  initFileViewer(id: bigint) {
    this.fileResources = [];
    this.displayedFile = null;
    this.fileId = Number(id);
    let downloadSubscription = this.patientService.download(this.fileId).subscribe(
      {
        next: (files: FileDTO[]) =>
        {
          for (let file of files)
          {
            let fileBlob = this.base64toBlob(file.content, file.mimetype);
            let fileResource = new FileResourceInfo(file.originalName, fileBlob, file.mimetype, file.creationDate);
            this.fileResources.push(fileResource);

            // Open first file so page opens up nicely
            if (this.displayedFile == null && file.mimetype != "")
            {
              this.displayFile(fileResource);
            }
          }
        },
        error: (error) =>
        {
          this.popUpMessageService.displayError(error);
          //alert(error.error);
        },
        complete: () =>
        {
          downloadSubscription.unsubscribe();
        }
      })
    this.filesLoaded = true;
  }

  // Some magic bound to life cycle hooks to make it possible to render docx file after "div" container becomes available (loads in DOM file)
  // div is loaded if and only if displayed file has mime type of word document
  ngAfterViewChecked(): void
  {
    if (this.displayedFile !== null && this.isRenderedFileDirty)
    {
      if (this.displayedFile.mimetype === "text/plain")
      {
        let docxFileContainer = document.getElementById("plainTextContainer");
        if (docxFileContainer !== null)
        {
          this.isRenderedFileDirty = false;
          this.displayedFile.fileBlob.text().then(text => docxFileContainer.textContent = text);
        }
      }

      if (this.displayedFile.mimetype == "application/msword" ||
        this.displayedFile.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      {
        let docxFileContainer = document.getElementById("docxContainer");
        if (docxFileContainer !== null)
        {
          this.isRenderedFileDirty = false;
          renderAsync(this.displayedFile.fileBlob, docxFileContainer).then(x => {});
        }
      }
    }
  }

  backToDetails(id: number)
  {
    this.router.navigate(['appointment-details', id])
  }

  displayFile(file: FileResourceInfo)
  {
    this.isRenderedFileDirty = true;
    this.displayedFile = file;
    console.log(file.fileName);

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

  MedCard(id: bigint){
    // let result = this.router.navigate(['medCard', id]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['medCard', id])
    )
    window.open(url, '_blank');
  }

}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
