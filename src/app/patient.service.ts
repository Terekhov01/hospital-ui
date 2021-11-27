import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient";
import {AppointmentRegistration} from "./appointment-registration";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "http://localhost:8080/api/patients";
  private fileURL = "http://localhost:8080/api/files";

  constructor(private httpClient: HttpClient) { }

  getPatientByLastName(lastName: string): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/lastname/${lastName}`);
  }

  // uploadFile(file: File, id: number): Observable<Object>{
  //   return this.httpClient.post(`${this.fileURL}/${id}`, file);
  // }
  //
  // upload(formData: FormData, id: number): Observable<HttpEvent<string[]>> {
  //   return this.httpClient.post<string[]>(`${this.fileURL}/${id}`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  postFile(fileToUpload: File, id: number): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(`${this.fileURL}/${id}`, formData);
  }

}
