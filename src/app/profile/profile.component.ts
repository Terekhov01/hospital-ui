import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {Employee} from '../employee';
import {EmployeeService} from '../_services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  id: number;
  employee: Employee;
  constructor(private token: TokenStorageService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.employee = new Employee();
    this.id = this.currentUser.id;
    this.employeeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });
  }

}
