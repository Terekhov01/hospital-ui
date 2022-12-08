import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "../doctor";
import {IUserNameId} from "../doctor-selector/doctor-selector.i-raw-data";
import {environment} from "../../environments/environment";
// import {Doctor} from "./doctor";
// import { IUserNameId } from "./doctor-selector/doctor-selector.i-raw-data";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseURL = environment.apiUrl + "/api/doctors";
  private getBySpecializationURL = environment.apiUrl + "/doctorusers/find-by/specialization";

  constructor(private httpClient: HttpClient) { }

  getDoctorByLastName(lastName: string): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.baseURL}/lastname/${lastName}`);
  }

  getDoctorShortInfoBySpecialization(specialization: string): Observable<IUserNameId[]>
  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("specialization", specialization);

    return this.httpClient.get<IUserNameId[]>(this.getBySpecializationURL, { params: httpParams });
  }
  getDoctorList(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseURL}`);
  }
}
