import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeDTO } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private doctorURL = "http://localhost:8080/api/doctors";
  private baseURL = "http://localhost:8080/api/v1/employees";
  private REGURL = "http://localhost:8080/api/auth/signup";
  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  /*createEmployee(employee: EmployeeDTO): Observable<Object>{
    return this.httpClient.post(`${this.REGURL}`, employee);
  }*/
  
  createDoctor(doctor: EmployeeDTO): Observable<Object>{
    return this.httpClient.post(`${this.REGURL}/doctor`, doctor);
  }
  
  getDoctorById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  getAccountDetailsById(id: number): Observable<Employee>
  {
    return this.httpClient.get<Employee>(`${this.doctorURL}/${id}`);
  }

  update(employee: any): Observable<string>{
    return this.httpClient.put<string>(`${this.doctorURL}/update`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getEmployeesLarge() {
    return this.httpClient.get<any>(`${this.baseURL}`)
      .toPromise()
      .then(res => <Employee[]>res.data)
      .then(data => { return data; });
  }
}
