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
    this.medCardUrl = `http://localhost:8080/api/medCard`;
  }
  public getAll(id: number): Observable<MedCard>{
    return this.http.get<MedCard>(`${this.medCardUrl}/${id}`);
  }
  public getHereditary(id: number): Observable<any>{
    return this.http.get<any>(`${this.medCardUrl}/hereditary/${id}`);
  }
  public getContr(id: number): Observable<String>{
    return this.http.get<String>(`${this.medCardUrl}/contraindications/${id}`);
  }
  public editHereditary(id: number, hereditary: string): Observable<Object>{
    return this.http.put(`${this.medCardUrl}/edit-hereditary/${id}`, hereditary);
  }
  public editContr(id: number, contraindications: String): Observable<Object>{
    return this.http.put(`${this.medCardUrl}/edit-contr/${id}`, contraindications);
  }
}
