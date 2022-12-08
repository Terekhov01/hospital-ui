import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl + '/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + "/api/v1";

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAccountDetailsById(id: number): Observable<User>
  {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  update(user: User): Observable<string>
  {
    return this.http.put<string>(`${this.baseUrl}/update`, user);
  }
}
