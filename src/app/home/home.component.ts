import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Service} from "../service";
import {ServiceServiceService} from "../service-service.service";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {AppointmentRegistration} from "../appointment-registration";
import {User} from "../user";
import {TokenStorageService} from "../_services/token-storage.service";
import {DoctorService} from "../DoctorInList/doctorList/doctor.service";
import {PatientService} from "../patient.service";


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
  user: User;
  isDoctor = false;
  isLoggedIn = false;
  private roles: string[];


  constructor(private userService: UserService,
              private serviceService: ServiceServiceService,
              private appRegServ: AppointmentRegistrationService,
              private tokenStorageService: TokenStorageService,
              private doctorService: DoctorService,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
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
    this.doctorService.getDoctorsList().subscribe(data => {
      this.doctorAmount = data.length;
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patientAmount = data.length;
    });
    if (this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
    }
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
