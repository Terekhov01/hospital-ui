import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppointmentRegistration } from "../appointment-registration";
import { AppointmentRegistrationService } from "../appointment-registration.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DoctorScheduleService} from "../_services/doctor-schedule.service";
import { PopUpMessageService } from '../_services/pop-up-message.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-registration-list',
  templateUrl: './appointment-registration-list.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['./appointment-registration-list.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class AppointmentRegistrationListComponent implements OnInit {

  appointmentRegistrations: AppointmentRegistration[] = [];
  ar: AppointmentRegistration = new AppointmentRegistration();
  dateString: string;
  isLoaded: boolean;
  isDetailsPresent: boolean;
  arToDelete: AppointmentRegistration = new AppointmentRegistration();

  constructor(private appointmentRegistrationService: AppointmentRegistrationService, public datePipe: DatePipe,
              private router: Router, private doctorScheduleService: DoctorScheduleService,
              private popUpMessageService: PopUpMessageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.isDetailsPresent = false;
    this.getAppointmentRegistrations();
  }

  private getAppointmentRegistrationByDocAndPat(doc: string, pat: string) {
    this.appointmentRegistrationService.getAppointmentRegistrationByDocAndPat(doc, pat).subscribe(data => {
      this.appointmentRegistrations.push(data);
    })
  }

  private getAppointmentRegistrations() {
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_PATIENT") {
      this.appointmentRegistrationService.getPatientAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointmentRegistrations = data;
      })
    } else if (usr_role == "ROLE_DOCTOR") {
      this.appointmentRegistrationService.getDoctorAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointmentRegistrations = data;
      })
    } else {
      this.popUpMessageService.displayError("Ошибка авторизации. Войдите на сайт");
      //alert("ERROR: UNAUTHORIZED")
    }
  }

  updateAppointmentRegistration(id: bigint) {
    let result = this.router.navigate(['update-appointment-registration', id]);
  }

  deleteAppointmentRegistration(appointmentRegistration: AppointmentRegistration) {
    this.modalService.dismissAll();
    this.doctorScheduleService.updateIntervalIsAssigned(appointmentRegistration.doctor.user.id, "false", appointmentRegistration.start).subscribe(response => {});
    this.appointmentRegistrationService.deleteAppointmentRegistration(BigInt(appointmentRegistration.id)).subscribe(data => {
      console.log(data);
      this.getAppointmentRegistrations();
    })
    this.popUpMessageService.displayConfirmation("Запись успешно отменена")
  }

  showDetailsModal(content, id: bigint) {
    this.isDetailsPresent = false;
    this.modalService.open(content, { size: 'xl', centered: true });
    this.appointmentRegistrationService.getAppointmentRegistrationByID(id).subscribe(data => {
      this.isDetailsPresent = true;
      this.ar = data;
    })
  }

  showDeleteModal(content, appReg: AppointmentRegistration) {
    this.modalService.open(content, { size: 'xl', centered: true });
    this.arToDelete = appReg;
  }

  appointmentRegistrationDetails(id: bigint) {
    let result = this.router.navigate(['appointment-registration-details', id]);
  }

}
