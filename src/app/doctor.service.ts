import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "./doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseURL = "http://localhost:8080/api/doctors";

  constructor(private httpClient: HttpClient) { }

  getDoctorByLastName(lastName: string): Observable<Doctor> {
    console.log("Finding doctor by lastname: " + lastName)
    return this.httpClient.get<Doctor>(`${this.baseURL}/lastname/${lastName}`);
  }

}
