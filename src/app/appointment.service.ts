import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment, AppointmentCreationDTO} from "./appointment";

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

  getAppointmentByID(id: bigint): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.baseURL}/${id}`)
  }

  // При создании встречи необходимо, чтобы создание записи о встрече в таблице и загрузка файла, 
  // а также больничного происзходили в одной транзакции. Иначе невозможно гарантировать, что больничный выпишется,
  // если врач завершит встречу. Поэтому передавать информацию нужно в одном запросе, а не разбивать его на два.
  // Я переписал запись на прием
  createAppointment(appointmentDTO: AppointmentCreationDTO): Observable<string>
  {
    let appointmentDTOStr = JSON.stringify(appointmentDTO);
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
}
