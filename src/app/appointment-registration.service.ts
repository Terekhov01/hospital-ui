import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentRegistration} from "./appointment-registration";

@Injectable({
  providedIn: 'root'
})
export class AppointmentRegistrationService {

  private baseURL = "http://localhost:8080/api/appointmentRegistrations";

  constructor(private httpClient: HttpClient) { }

  getAppointmentRegistrationsList(): Observable<AppointmentRegistration[]> {
    return this.httpClient.get<AppointmentRegistration[]>(`${this.baseURL}`);
  }

  getAppointmentRegistrationByID(id: bigint): Observable<AppointmentRegistration> {
    return this.httpClient.get<AppointmentRegistration>(`${this.baseURL}/${id}`)
  }

  getDoctorAppointmentRegistrations(id: bigint): Observable<AppointmentRegistration[]> {
    return this.httpClient.get<AppointmentRegistration[]>(`${this.baseURL}/doctor/${id}`);
  }

  getPatientAppointmentRegistrations(id: bigint): Observable<AppointmentRegistration[]> {
    return this.httpClient.get<AppointmentRegistration[]>(`${this.baseURL}/patient/${id}`);
  }

  getAppointmentRegistrationByDocAndPat(doc: string, pat: string): Observable<AppointmentRegistration> {
    return this.httpClient.get<AppointmentRegistration>(`${this.baseURL}/${doc}/${pat}`);
  }

  createAppointmentRegistration(appointmentRegistration: AppointmentRegistration): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, appointmentRegistration);
  }

  updateAppointmentRegistration(id: bigint, appointmentRegistration: AppointmentRegistration): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appointmentRegistration);
  }

  deleteAppointmentRegistration(id: bigint): Observable<AppointmentRegistration> {
    return this.httpClient.delete<AppointmentRegistration>(`${this.baseURL}/${id}`);
  }

}
