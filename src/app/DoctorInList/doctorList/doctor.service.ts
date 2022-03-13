import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "./doctor.models";
import {Observable} from "rxjs";
import {DoctorRequest} from "./doctor-request.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DoctorService {

  id?: number;
  private userUrl = 'http://localhost:8080/doctorusers';
  // private userUrl = 'http://localhost:8080/user-portal/doctorusers';

  constructor(private http: HttpClient) {
  }
  getDoctorsList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  getDoctourAmount(): Observable<bigint>
  {
    return this.http.get<bigint>(`${this.userUrl}/count-all`);
  }

//| undefined
  getDoctorByID(id: number | undefined): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`)
  }

  createDoctor(appointment: DoctorRequest): Observable<Object> {
    return this.http.post(`${this.userUrl}`, appointment);
  }

  updateDoctor(appointment: User): Observable<Object> {
    return this.http.put(`${this.userUrl}/${appointment.id}`, appointment);
  }

  // updateDoctor(id: number, appointment: User): Observable<Object>{
  //   return this.http.put(`${this.userUrl}/${id}`, appointment);
  // }

  deleteDoctor(id: number): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }




}
