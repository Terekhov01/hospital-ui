import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Service} from '../service';
import {ServiceServiceService} from '../service-service.service';
import {AppointmentRegistrationService} from '../appointment-registration.service';
import {AppointmentRegistration} from '../appointment-registration';
import {User} from '../user';
import {TokenStorageService} from '../_services/token-storage.service';
import {DoctorService} from '../DoctorInList/doctorList/doctor.service';
import {PatientService} from '../patient.service';
import { PopUpMessageService } from '../_services/pop-up-message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  patientAmount: number = null;
  doctorAmount: number = null;
  services: Service[];
  popularService: string = null;
  content: string;
  appRegs: AppointmentRegistration[];
  user: User;
  isDoctor = false;
  isLoggedIn = false;
  private roles: string[];
  contentLoaded = false;


  constructor(private userService: UserService,
              private serviceService: ServiceServiceService,
              private appRegServ: AppointmentRegistrationService,
              private tokenStorageService: TokenStorageService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private popUpMessageService: PopUpMessageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1500);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.serviceService.getServicesList().subscribe(data => {
      this.services = data;
    });

    const appointmentSubscription = this.appRegServ.getAppointmentRegistrationsList().subscribe({
      next: (data) =>
      {
        this.appRegs = data;
        this.maxCount();
      },
      error: (error) =>
      {
        this.appRegs = [new AppointmentRegistration()];
        this.appRegs[0].service = '____';
        this.maxCount();
        this.popUpMessageService.displayWarning('Не удалось получить информацию о самой популярной услуге. Возможно, сервер недоступен');
      },
      complete: () =>
      {
        appointmentSubscription.unsubscribe();
      }
    });

    const doctorAmountSubscription = this.doctorService.getDoctourAmount().subscribe({
      next: (data: bigint) =>
      {
        this.doctorAmount = Number(data);
      },
      error: (error) =>
      {
        this.doctorAmount = -1;
        this.popUpMessageService.displayWarning('Не удалось получить информацию о количестве врачей в поликлинике. Возможно, сервер недоступен');
      },
      complete: () =>
      {
        doctorAmountSubscription.unsubscribe();
      }
    });

    const patientAmountSubscription = this.patientService.getPatientAmount().subscribe({
      next: (data: bigint) =>
      {
        this.patientAmount = Number(data);
      },
      error: (error) =>
      {
        this.patientAmount = -1;
        this.popUpMessageService.displayWarning('Не удалось получить информацию о количестве пациентов в поликлинике. Возможно, сервер недоступен');
      },
      complete: () =>
      {
        patientAmountSubscription.unsubscribe();
      }
    });

    if (this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
    }
  }

  // tslint:disable-next-line:typedef
  maxCount(){
    const obj = {};
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.appRegs.length; i++){
      const key = this.appRegs[i].service;
      if (obj[key]){
        obj[key]++;
      }else {
        obj[key] = 1;
      }
    }
    let maxCount = 0;
    for (const key in obj){
      if (maxCount < obj[key]){
        maxCount = obj[key];
        this.popularService = key;
      }
    }
  }
}
