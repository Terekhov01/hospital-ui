import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient";
import {AppointmentRegistration} from "./appointment-registration";
import {Doctor} from "./doctor";
import { FileDTO } from "./file-transfer-data/file-transfer-data.data-transfer-object";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = environment.apiUrl + "/api/patients";
  private fileURL = environment.apiUrl + "/api/files";
  private downloadURL = environment.apiUrl + "/api/files/download/"
  private doctorURL = environment.apiUrl + "/api/doctors";

  constructor(private httpClient: HttpClient) { }

  getPatientByLastName(lastName: string): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/lastname/${lastName}`);
  }

  getPatientAmount(): Observable<bigint>
  {
    return this.httpClient.get<bigint>(`${this.baseURL}/count-all`);
  }

  getPatientById(id: bigint): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/id/${id}`);
  }

  getAccountDetailsById(id: bigint): Observable<any>
  {
    return this.httpClient.get<Patient>(`${this.baseURL}/${id}`);
  }

  getAllPatients(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseURL}`);
  }

  getDoctorById(id: bigint): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.doctorURL}/id/${id}`)
  }

  update(patient: Patient): Observable<string>
  {
    return this.httpClient.put<string>(`${this.baseURL}/update`, patient);
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

  getFiles(id: number): Observable<File[]> {
    return this.httpClient.get<File[]>(`${this.fileURL}/id/${id}`);
  }

  // getFile(id: number):  Observable<Blob> {
  //   return this.httpClient.get(`${this.downloadURL}${id}`, {
  //     responseType: 'blob'
  //   })
  // }

  download(id: number): Observable<FileDTO[]> {
    return this.httpClient.get<FileDTO[]>(`${this.downloadURL}${id}`);
  }

  printRecipe(id: bigint): Observable<Blob> {
    return this.httpClient.get(`${this.fileURL}/getRecipe/${id}`, {
      responseType: 'blob'
    })
  }

}
