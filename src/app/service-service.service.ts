import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "./doctor";
import {Service} from "./service";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {

  private baseURL = "http://localhost:8080/api/services";

  constructor(private httpClient: HttpClient) { }

  getServiceByName(name: string): Observable<Service> {
    console.log("Finding service by name: " + name)
    return this.httpClient.get<Service>(`${this.baseURL}/name/${name}`);
  }

  getServicesList(): Observable<Service[]> {
    console.log("getting service list")
    return this.httpClient.get<Service[]>(`${this.baseURL}`);
  }
}
