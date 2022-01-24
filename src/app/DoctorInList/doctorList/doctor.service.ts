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
  //private userUrl = '/api';

  // private usereditUrl = 'http://localhost:8080/user-portal/doctorusers';

//   public getUsers() {
//     return this.http.get<User[]>(this.userUrl);
//   }
//
//   public deleteUser(user: User) {
//     return this.http.delete(this.userUrl + "/"+ user.id);
//   }
//
//   public createUser(user: User) {
//     return this.http.post<User>(this.userUrl, user);
//   }
//
//   public findUser(id: number,value: any): Observable<User> {
//     return this.http.put(`${this.userUrl}/${id}`,value);
//   }
// //sdggfhghj
//   public editUser(user: User) {
//     return this.http.get<User[]>(this.userUrl);
//   }
//
//   getEmployeeById(id: number | undefined): Observable<User>{
//     return this.http.get<User>(`${this.userUrl}/${id}`,);
//   }
//
//   updateEmployee(id: number | undefined, value: any): Observable<Object> {
//     return this.http.put(`${this.userUrl}/${id}`, value);
//   }
//   //
//   // getEmployeeById(id: string, data: User): Observable<any> {
//   //   return this.http.put(`${this.userUrl}/${id}`, data);
//   // }
//
//   updatePost(id: string, data: User): Observable<Object> {
//     return this.http.put(`${this.userUrl}/${id}`, data);
//   }

  getDoctorsList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
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
