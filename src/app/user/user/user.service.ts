import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "./user.models";
import {Observable} from "rxjs";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

  id?:number;

  private userUrl = 'http://localhost:8080/user-portal/doctorusers';
  //private userUrl = '/api';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user: User) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }

  public createUser(user: User) {
    return this.http.post<User>(this.userUrl, user);
  }

  public findUser(id: number,value: any): Observable<User> {
    return this.http.put(`${this.userUrl}/${id}`,value);
  }

  public editUser(user: User) {
    return this.http.get<User[]>(this.userUrl);
  }

  getEmployeeById(id: number | undefined): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  updateEmployee(id: number | undefined, value: any): Observable<Object> {
    return this.http.put(`${this.userUrl}/${id}`, value);
  }

}
