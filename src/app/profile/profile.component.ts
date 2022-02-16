import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {Employee} from '../employee';
import {EmployeeService} from '../_services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  id: number;
  employee: Employee;
  constructor(private token: TokenStorageService, private employeeService: EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.employee = new Employee();
    this.id = this.currentUser.id;
    this.employeeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });
  }
  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => error => console.log(error));
  }
  updateProfile(id: number){
    this.router.navigate(['updateprofile', id]);
  }
}
