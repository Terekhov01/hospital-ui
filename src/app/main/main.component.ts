import {Component, OnInit} from '@angular/core';
import {ServiceServiceService} from "../service-service.service";
import {Service} from "../service";
import {TokenStorageService} from "../_services/token-storage.service";
import {User} from "../user";
import {DoctorService} from "../DoctorInList/doctorList/doctor.service";
import {PatientService} from "../patient.service";
import {AppointmentRegistration} from "../appointment-registration";
import {AppointmentRegistrationService} from "../appointment-registration.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  patientAmount: number = 589;
  doctorAmount: number = 136;
  // services: Service[];
  popularService: string;
  appRegs: AppointmentRegistration[];
  user: User;
  constructor(private serviceService: ServiceServiceService,
              private tokenStorageService: TokenStorageService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appRegServ: AppointmentRegistrationService,) {
  }
  ngOnInit(): void {
    // this.user = this.tokenStorageService.getUser();
    // this.serviceService.getServicesList().subscribe(data => {
    //   this.services = data;
    // });
    this.doctorService.getDoctorsList().subscribe(data => {
      this.doctorAmount = data.length;
      console.log(this.doctorAmount);
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patientAmount = data.length;
    });
    this.appRegServ.getAppointmentRegistrationsList().subscribe(data => {
      this.appRegs = data;
      this.maxCount();
    });
  }
  maxCount(){
    const obj = {};
    console.log(this.appRegs);
    for (let i = 0 ; i < this.appRegs.length; i++){
      let key = this.appRegs[i].service;
      if (obj[key]){
        obj[key]++;
      }else {
        obj[key] = 1;
      }
    }
    let maxCount = 0;
    for (let key in obj){
      if (maxCount < obj[key]){
        maxCount = obj[key];
        this.popularService = key;
      }
    }
  }

}
