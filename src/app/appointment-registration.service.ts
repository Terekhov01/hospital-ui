import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentRegistration} from "./appointment-registration";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentRegistrationService {

  private baseURL = "http://localhost:8080/api/appointmentRegistrations";

  constructor(private httpClient: HttpClient) { }

  getAppointmentRegistrationsList(): Observable<AppointmentRegistration[]> {
    return this.httpClient.get<AppointmentRegistration[]>(`${this.baseURL}`);
  }

  getAppointmentRegistrationByID(id: number): Observable<AppointmentRegistration> {
    return this.httpClient.get<AppointmentRegistration>(`${this.baseURL}/${id}`)
  }

  getAppointmentRegistrationByDocAndPat(doc: string, pat: string): Observable<AppointmentRegistration> {
    return this.httpClient.get<AppointmentRegistration>(`${this.baseURL}/${doc}/${pat}`);
  }

  createAppointmentRegistration(appointmentRegistration: AppointmentRegistration): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, appointmentRegistration);
  }

  updateAppointmentRegistration(id: number, appointmentRegistration: AppointmentRegistration): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appointmentRegistration);
  }

  deleteAppointmentRegistration(id: number): Observable<AppointmentRegistration> {
    return this.httpClient.delete<AppointmentRegistration>(`${this.baseURL}/${id}`);
  }

}
