import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../_services/employee.service';
import { Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  private roles: string[];
  showAdminBoard = false;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
              private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(
    {
      next: (data) =>
      {
        console.log(data);
        this.goToEmployeeList();
      },
      error: (error) => 
      {
        console.log(error)
      }
    });
  }

  goToEmployeeList(){
    this.router.navigate(['/admin']);
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }
}
