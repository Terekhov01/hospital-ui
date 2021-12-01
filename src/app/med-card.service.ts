import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedCard} from "./med-card";
import {Appointment} from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class MedCardService {
  private medCardUrl: string;
  constructor(private http: HttpClient) {
    this.medCardUrl = `http://localhost:8080/medCard`;
  }
  public getAll(): Observable<MedCard>{
    return this.http.get<MedCard>(this.medCardUrl);
  }
  public getHereditary(): Observable<any>{
    return this.http.get<any>(`${this.medCardUrl}/hereditary`);
  }
  public getContr(): Observable<String>{
    return this.http.get<String>(`${this.medCardUrl}/contraindications`);
  }
  public editHereditary(hereditary: string): Observable<Object>{
    return this.http.put(`${this.medCardUrl}/edit-hereditary`, hereditary);
  }
  public editContr(contraindications: String): Observable<Object>{
    return this.http.put(`${this.medCardUrl}/edit-contr`, contraindications);
  }
  public getAppointment(id: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${this.medCardUrl}/${id}`);
  }
  public addAppointment(appointment: Appointment): Observable<Object>{
    return this.http.post(this.medCardUrl, appointment);
  }
  public updateAppointment(id: number, appointment: Appointment): Observable<Object>{
    return this.http.put(`${this.medCardUrl}/${id}`, appointment);
  }
  public deleteAppointment(id: number): Observable<Appointment>{
    return this.http.delete<Appointment>(`${this.medCardUrl}/${id}`);
  }
}
