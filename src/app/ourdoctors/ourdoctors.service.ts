import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user/user/doctor.models";
import {ourdoctorsModel} from "./ourdoctors.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OurdoctorsService {

  constructor(private http:HttpClient) { }

  id?:number;

  private userUrl = 'http://localhost:8080/user-portal/ourdoctors';

  getOurDoctorsList(): Observable<ourdoctorsModel[]> {
    return this.http.get<ourdoctorsModel[]>(`${this.userUrl}`);
  }

  addOurDoctorRating() {

  }
}
