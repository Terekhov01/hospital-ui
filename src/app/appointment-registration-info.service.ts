import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import {
  DoctorScheduleAppointmentsDataDaily,
  ScheduleInterval
} from "./schedule-transfer-data/schedule-appointment.data-transfer-objects";
import {BehaviorSubject} from "rxjs";
import {BigInteger} from "@angular/compiler/src/i18n/big_integer";


@Injectable({
  providedIn: 'root'
})
export class AppointmentRegistrationInfoService {

  // DoctorScheduleAppointmentsDataDaily
  id = new BehaviorSubject<bigint>(BigInt(-1));
  currentId = this.id.asObservable();

  specializationName = new BehaviorSubject<string>("No Specialization");
  currentSpecialization = this.specializationName.asObservable();

  doctorName = new BehaviorSubject<string>("No Name");
  currentDoctorName = this.doctorName.asObservable();

  date = new BehaviorSubject<Date>(new Date());
  currentDate = this.date.asObservable();


  // ScheduleInterval
  intervalStartTime = new BehaviorSubject<Date>(new Date());
  currentIntervalStartTime = this.intervalStartTime.asObservable();

  isAssigned = new BehaviorSubject<boolean>(true);
  currentIsAssigned = this.isAssigned.asObservable();

  constructor() {
  }

  changeDoctorName(name: string) {
    console.log("CHANGING DOCTOR NAME: " + name)
    this.doctorName.next(name);
  }

  changeDoctorId(id: bigint) {
    console.log("CHANGING DOCTOR ID: " + id)
    this.id.next(id);
  }

  changeDate(date: Date) {
    console.log("CHANGING DATE: ")
    this.date.next(date);
  }

  changeIntervalStartTime(intervalStartTime: Date) {
    console.log("CHANGING intervalStartTime: " + intervalStartTime.toDateString())
    this.intervalStartTime.next(intervalStartTime);
  }

  changeIsAssigned(isAssigned: boolean) {
    console.log("CHANGING isAssigned: " + isAssigned)
    this.isAssigned.next(isAssigned);
  }

  // getId(): bigint {
  //   return this.id;
  // }
  //
  // setId(value: bigint) {
  //   this.id = value;
  // }
  //
  // getSpecializationName(): string {
  //   return this.specializationName;
  // }
  //
  // setSpecializationName(value: string) {
  //   this.specializationName = value;
  // }
  //
  // getDoctorName(): string {
  //   return this.doctorName;
  // }
  //
  // setDoctorName(value: string) {
  //   this.doctorName = value;
  // }
  //
  // getDate(): Date {
  //   return this.date;
  // }
  //
  // setDate(value: Date) {
  //   this.date = value;
  // }
  //
  // getIntervalStartTime(): Date {
  //   return this.intervalStartTime;
  // }
  //
  // setIntervalStartTime(value: Date) {
  //   this.intervalStartTime = value;
  // }
  //
  // getIsAssigned(): boolean {
  //   return this.isAssigned;
  // }
  //
  // setIsAssigned(value: boolean) {
  //   this.isAssigned = value;
  // }
}

