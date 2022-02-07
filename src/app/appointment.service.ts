import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL = "http://localhost:8080/api/appointments";
  private fileURL = "http://localhost:8080/api/files";

  constructor(private httpClient: HttpClient) { }

  getAppointmentsList(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}`);
  }

  getAppointmentByID(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.baseURL}/${id}`)
  }

  createAppointment(appointment: Appointment): Observable<Appointment>{
    // const formData = new FormData();
    // formData.append("Appointment", appointment.file, appointment.file.name);
    // return form data instead of appointment

    return this.httpClient.post<Appointment>(`${this.baseURL}`, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.httpClient.delete<Appointment>(`${this.baseURL}/${id}`);
  }

  postFile(fileToUpload: File, id: number): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(`${this.fileURL}/${id}`, formData);
  }

}
