import {Component, OnInit} from '@angular/core';
import {MedCard} from '../med-card';
import {MedCardService} from '../med-card.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Appointment} from '../appointment';
import {PagerService} from '../pager.service';
import {ServiceServiceService} from '../service-service.service';
import {Service} from '../service';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {error} from 'protractor';
import {OurdoctorsService} from '../OurDoctorsInClinic/ourdoctors.service';
import {query} from '@angular/animations';
// import {DoctorService} from "../user/user/doctor.service";
// import {User} from "../user/user/doctor.models";

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
  services: any[];
  selectedService: Service;
  room: string;
  id: number;
  allItemsEmpty: boolean;
  contentLoaded = false;
  // doctors: User[];
  // selectedDoctor: User;

  constructor(private medCardService: MedCardService,
              private serviceService: ServiceServiceService,
              private router: Router,
              private pagerService: PagerService,
              private actRoute: ActivatedRoute,
              ) {
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2500);
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
    this.serviceService.getServicesList().subscribe(data => {
      this.services = data;
    });
    this.actRoute.params.subscribe((params: Params) => this.id = params.id);
    this.room = null;
    this.selectedService = null;
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onServiceChange(){
    this.allItems = this.medCard.appointments.filter(app => app.appointmentRegistration.service === this.selectedService.toString());
    if (this.room != undefined) {
      console.log(this.room);
      this.allItems = this.allItems.filter(app => app.appointmentRegistration.room === this.room);
    }
    this.setPage(1);
    if (this.allItems.length == 0) { this.allItemsEmpty = true; }
  }

  roomSearch(){
    if (this.selectedService != null){
      this.allItems = this.medCard.appointments.filter(app => app.appointmentRegistration.service === this.selectedService.toString());
    }
    this.allItems = this.allItems.filter(app => app.appointmentRegistration.room === this.room);
    this.setPage(1);
    if (this.allItems.length == 0) { this.allItemsEmpty = true; }
  }

  getHereditary(){
    this.router.navigate(['medCard/hereditary', this.id]);
  }
  editHereditary(){
    this.router.navigate(['medCard/edit-hereditary', this.id]);
  }
  getContr(){
    this.router.navigate(['medCard/contraindications', this.id]);
  }
  editContr(){
    this.router.navigate(['medCard/edit-contr', this.id]);
  }
  appointmentOne(id: number){
    this.router.navigate(['appointment-details', id]);
  }
}
