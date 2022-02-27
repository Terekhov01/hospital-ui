import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {EmployeeService} from '../_services/employee.service';
import {Employee} from '../employee';
import {TokenStorageService} from '../_services/token-storage.service';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('dt') table: Table;
  showAdminBoard = false;
  employees: Employee[];
  selectedEmployees: Employee[];
  searchStr = '';
  roleAdmin = 'admin';
  statuses: any[];
  loading: boolean = true;
  employee: Employee;
  qwe:boolean = false;
  private roles: string[];
  constructor(private employeeService: EmployeeService,
              private router: Router, private tokenStorageService: TokenStorageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.employeeService.getEmployeesLarge().then(employees => {
      this.employees = employees;
      this.loading = false;
      if ('ROLE_ADMIN' in this.employee.roles){
      this.qwe = true;
    }
    });
    this.statuses = [
      {label: 'ROLE_ADMIN', value: 'ROLE_ADMIN'},
      {label: 'ROLE_USER', value: 'ROLE_USER'},
      {label: 'ROLE_DOCTOR', value: 'ROLE_DOCTOR'}
    ];
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.getEmployees();
  }
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
  onRoleChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
}
