import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Service} from "../service";
import {ServiceServiceService} from "../service-service.service";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {AppointmentRegistration} from "../appointment-registration";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  patientAmount: number = 589;
  doctorAmount: number = 136;
  services: Service[];
  popularService: string;
  content: string;
  appRegs: AppointmentRegistration[];


  constructor(private userService: UserService,
              private serviceService: ServiceServiceService,
              private appRegServ: AppointmentRegistrationService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.serviceService.getServicesList().subscribe(data => {
      this.services = data;
    });
    this.appRegServ.getAppointmentRegistrationsList().subscribe(data => {
      this.appRegs = data;
      this.maxCount();
    });
  }
  maxCount(){
    const obj = {};
    console.log(this.appRegs);
    for(let i = 0 ; i < this.appRegs.length; i++){

      let key = this.appRegs[i].service;
      if(obj[key]){
        obj[key]++
      }else {
        obj[key] = 1;
      }
    }
    let maxCount = 0;
    for(let key in obj){
      if(maxCount < obj[key]){
        maxCount = obj[key];
        this.popularService = key;
      }
    }
  }
}
