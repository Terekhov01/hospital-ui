import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ourdoctorsModel} from "./ourdoctors.model";
import {DoctorRatingRequest} from "../OurDoctorsAddRating/doctor-rating-request.model";
import {DoctorRequest} from "../DoctorInList/doctorList/doctor-request.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OurdoctorsService {

  id?: number;
  private userUrl = 'http://localhost:8080/ourdoctors';
  private RatingUrl = 'http://localhost:8080/rating';
  private doctorInfo = 'http://localhost:8080/doctorinfo';

  // private userUrl = 'http://localhost:8080/user-portal/ourdoctors';
  // private RatingUrl = 'http://localhost:8080/user-portal/rating';
  // private doctorInfo = 'http://localhost:8080/user-portal/doctorinfo';

  constructor(private http: HttpClient) {
  }

  getOurDoctorsList(): Observable<ourdoctorsModel[]> {
    return this.http.get<ourdoctorsModel[]>(`${this.userUrl}`);
  }

  updateDoctorRating(doctorRating: DoctorRatingRequest): Observable<Object> {
    return this.http.post(`${this.RatingUrl}`, doctorRating);
  }

  getDoctorsInfo(id: number | undefined): Observable<DoctorRequest> {
    return this.http.get<DoctorRequest>(`${this.doctorInfo}/${id}`);
  }

}
