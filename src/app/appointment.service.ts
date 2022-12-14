import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment, AppointmentCreationDTO} from "./appointment";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL = environment.apiUrl + "/api/appointments";
  private fileURL = environment.apiUrl + "/api/files";

  constructor(private httpClient: HttpClient) { }

  getAppointmentsList(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}`);
  }

  getAppointmentByID(id: bigint): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.baseURL}/${id}`)
  }

  getDoctorAppointments(id: bigint): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}/doctor/${id}`);
  }

  getPatientAppointments(id: bigint): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseURL}/patient/${id}`);
  }

  getDoctorAppointmentsPaged(id: bigint, request) {
    const url = `${this.baseURL}/doctorPaged/${id}`;
    const params = request;
    return this.httpClient.get(url, { params })
  }

  // При создании встречи необходимо, чтобы создание записи о встрече в таблице и загрузка файла,
  // а также больничного происзходили в одной транзакции. Иначе невозможно гарантировать, что больничный выпишется,
  // если врач завершит встречу. Поэтому передавать информацию нужно в одном запросе, а не разбивать его на два.
  // Я переписал запись на прием
  createAppointment(appointmentDTO: AppointmentCreationDTO): Observable<string>
  {
    // let appointmentDTOStr = JSON.stringify(appointmentDTO);

    let appointmentDTOStr = JSON.stringify(appointmentDTO, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    );

    const blob = new Blob([appointmentDTOStr], {
      type: 'application/json'
    });

    const formData: FormData = new FormData();

    formData.append("appointmentDTOBlob", blob);

    for (let fileToUpload of appointmentDTO.filesToUpload)
    {
      formData.append("filesToUpload", fileToUpload, fileToUpload.name);
    }

    return this.httpClient.post<string>(`${this.baseURL}`, formData);
  }

  updateAppointment(id: bigint, appointment: Appointment): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, appointment);
  }

  deleteAppointment(id: bigint): Observable<Appointment> {
    return this.httpClient.delete<Appointment>(`${this.baseURL}/${id}`);
  }

  toObject() {
    return JSON.parse(JSON.stringify(this, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    ));
  }

}
