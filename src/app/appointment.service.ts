import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL = "http://localhost:8080/api/appointments";

  constructor(private httpClient: HttpClient) { }

  getAppointmentsList(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}`);
  }

  getAppointmentByID(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.baseURL}/${id}`)
  }

  createAppointment(appointment: Appointment): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.httpClient.delete<Appointment>(`${this.baseURL}/${id}`);
  }

}
