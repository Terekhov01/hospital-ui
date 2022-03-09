import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { SpecializationService } from '../_services/specialization.service';
import { EmployeeDTO } from '../employee';
import { PopUpMessageService } from '../_services/pop-up-message.service';
import { ErrorHandleService } from '../_services/error-handle.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit 
{
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  private roles: string[];

  showAdminBoard = false;
  employee: EmployeeDTO = new EmployeeDTO();

  isPasswordHidden = true;

  specializationGroups = new Map<string, string[]>();
  specializationSelectFormControl = new FormControl();

  constructor(private employeeService: EmployeeService, private specializationService: SpecializationService,
              private router: Router, private tokenStorageService: TokenStorageService, private popUpMessageService: PopUpMessageService,
              private errorHandleService: ErrorHandleService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    let autocompleteSpecializationSubscription = this.specializationService.getSpecializationAutocompleteOptions().subscribe({
      next: (specializationAutocompleteOptions: Map<string, string[]>) =>
      {
          for (let startLetter in specializationAutocompleteOptions)
          {
              this.specializationGroups.set(startLetter, specializationAutocompleteOptions[startLetter]);
          }
      },
      error: (error) =>
      {
          this.popUpMessageService.displayError(error);
      },
      complete: () =>
      {
        autocompleteSpecializationSubscription.unsubscribe();
      }
    });
  }

  saveEmployee()
  {
    let doctorSubscription = this.employeeService.createDoctor(this.employee).subscribe(
    {
      next: (data) =>
      {
        this.isSuccessful = true;
        setTimeout(() => {
          this.router.navigate(['/admin']);
      }, 2000);
      },
      error: (error) => 
      {
        this.isSignUpFailed = true;
        this.errorMessage = this.errorHandleService.getMessage(error); // То же самое, что и выше, только может отловить больше ошибок
      },
      complete: () =>
      {
        doctorSubscription.unsubscribe();
      }
    });
  }

  onSubmit(){
    console.log(this.employee);
    if (this.specializationSelectFormControl.value != null)
    {
      this.employee.specializations = [];
      for (let specialization of this.specializationSelectFormControl.value)
      {
        this.employee.specializations.push(specialization);
      }
    }
    this.saveEmployee();
  }

  debug(value): boolean
  {
    console.log(value);
    return true;
  }
}
