import {Component, OnInit} from '@angular/core';
import {MedCard} from '../med-card';
import {MedCardService} from '../med-card.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Appointment} from '../appointment';
import {PagerService} from '../pager.service';
import {Observable} from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as printJS from "print-js";
import {PatientService} from "../patient.service";
import {DatePipe} from '@angular/common';
import {TokenStorageService} from "../_services/token-storage.service";
import {DoctorService} from "../_services/doctor.service";
import {Doctor} from "../doctor";
import {DoctorRequest} from "../DoctorInList/doctorList/doctor-request.model";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  courses$: Observable<any>;
  title = 'Медицинская карта';
  medCard: MedCard;
  pager: any = {};
  pagedItems: Appointment[];
  allItems: Appointment[];
  doctors: Doctor[];
  doctorsRequest: DoctorRequest[];
  specializations = new Set();
  selectedSpecialization;
  description: string;
  id: number;
  activateLoadingModal: boolean;
  contentLoaded = false;
  roles: string[];

  // doctors: User[];
  // selectedDoctor: User;

  appointments: Appointment[];
  appointment: Appointment;
  isLoaded: boolean;
  isEmpty: boolean;

  constructor(private medCardService: MedCardService,
              private router: Router,
              private pagerService: PagerService,
              private actRoute: ActivatedRoute,
              private modalService: NgbModal,
              private patientService: PatientService,
              public datePipe: DatePipe,
              private tokenStorageService: TokenStorageService,
              private docService: DoctorService
              ) {
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.activateLoadingModal = false;
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3500);
    this.id = this.actRoute.snapshot.params.id;
    this.medCardService.getAll(this.id).subscribe(
      data => {
      this.medCard = data;
      this.allItems = this.medCard.appointments;
      this.setPage(1);
    },
      error => {
        this.router.navigate(['accessDeniedPage']);
      }
    );
    this.docService.getDoctorList().subscribe(data => {
      this.doctors = data;
      for (const item of this.doctors) {
        for (const spec of item.specialist){
          this.specializations.add(spec.specialization);
        }
      }
    });
    this.actRoute.params.subscribe((params: Params) => this.id = params.id);
    this.description = null;
    this.selectedSpecialization = '0';
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onServiceChange() {
    if (this.selectedSpecialization === '0') { this.allItems = this.medCard.appointments; }
    else {
      this.allItems = this.medCard.appointments.filter(app =>
        app.appointmentRegistration.doctor.specialist.some(spec =>
          spec.specialization === this.selectedSpecialization
        )); }
    if (this.description !== null) {
      this.allItems = this.allItems.filter(app => app.description.includes(this.description));;
    }
    this.setPage(1);
  }

  descriptionSearch(){
    // if (this.selectedSpecialization != null){
    //   this.allItems = this.medCard.appointments.filter(app => app.appointmentRegistration.service === this.selectedSpecialization.toString());
    // }
    // this.allItems = this.allItems.filter(app => app.description.includes(this.description));
    this.onServiceChange();
    this.setPage(1);
  }

  getHereditary(){
    this.router.navigate(['medCard/hereditary', this.medCard.patient.id]);
  }
  editHereditary(){
    this.router.navigate(['medCard/edit-hereditary', this.medCard.patient.id]);
  }
  getContr(){
    this.router.navigate(['medCard/contraindications', this.medCard.patient.id]);
  }
  editContr(){
    this.router.navigate(['medCard/edit-contr', this.medCard.patient.id]);
  }
  appointmentOne(id: number){
    this.router.navigate(['appointment-details', id]);
  }

  appointmentDetails(content, id: bigint, a: Appointment) {
    this.appointment = a;
    this.modalService.open(content, { size: 'xl', centered: true, scrollable: true });
    // let result = this.router.navigate(['appointment-details', id]);
  }

  oToFileViewer1(id: bigint) {
    console.log("passing id: " + id);
    // let res = this.router.navigate(['file-viewer', id])
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['file-viewer', id])
    );
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

  goToFileViewer1(id: bigint) {
    console.log("passing id: " + id)
    // let res = this.router.navigate(['file-viewer', id])
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['file-viewer', id])
    )
    window.open(url, '_blank');
  }

}
