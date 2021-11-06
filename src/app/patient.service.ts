import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "http://localhost:8080/api/patients";

  constructor(private httpClient: HttpClient) { }

  getPatientByLastName(lastName: string): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/lastname/${lastName}`);
  }

}
