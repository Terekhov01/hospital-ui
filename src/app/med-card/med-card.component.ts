import { Component, OnInit } from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {Router} from "@angular/router";
import {Appointment} from "../appointment";
import {PagerService} from "../pager.service";
import {ServiceServiceService} from "../service-service.service";
import {Service} from "../service";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  title = "Медицинская карта";
  medCard: MedCard;
  pager: any = {};
  pagedItems: Appointment[];
  allItems: Appointment[];
  services: any[];
  selectedService: Service;

  constructor(private medCardService: MedCardService,
              private serviceService: ServiceServiceService,
              private router: Router,
              private pagerService: PagerService) {
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll().subscribe(data => {
      this.medCard = data;
      this.allItems = data.appointments;
      this.setPage(1);
    });
    this.serviceService.getServicesList().subscribe(data => {
      this.services = data;
    })
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onServiceChange(){
    this.allItems = this.medCard.appointments.filter(app => app.appointmentRegistration.service === this.selectedService.serviceName);
    console.log(this.allItems);
    console.log(this.selectedService);
    this.setPage(1);
  }

  getHereditary(){
    this.router.navigate(['medCard/hereditary'])
  }
  editHereditary(){
    this.router.navigate(['medCard/edit-hereditary'])
  }
  getContr(){
    this.router.navigate(['medCard/contraindications'])
  }
  editContr(){
    this.router.navigate(['medCard/edit-contr'])
  }
  appointments(){
    this.router.navigate(['appointments'])
  }
  appointmentOne(id: number){
    this.router.navigate(['appointment-details', id]);
  }
  editAppointment(id: number){
    this.router.navigate(['update-appointment', id])
  }
}
