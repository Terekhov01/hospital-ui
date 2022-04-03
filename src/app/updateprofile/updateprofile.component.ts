import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup} from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { PatientService } from '../patient.service';
import { Observable } from 'rxjs';
import { Patient } from '../patient';
import { User, Role } from '../user';
import { PopUpMessageService } from '../_services/pop-up-message.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  Role = Role;
  currentUser: any;
  currentUserRole: Role = Role.ROLE_ADMIN;
  currentUserInfo: any = 
  {
    userName: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: ""
  };
  myForm: FormGroup;
  id: number;
  employee: Employee = new Employee();
  constructor(private patientService: PatientService, private employeeService: EmployeeService, private userService: UserService,
              private token: TokenStorageService, private popUpMessageService: PopUpMessageService,
              private route: ActivatedRoute, public dialogRef: MatDialogRef<UpdateprofileComponent>,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currentUserRole = Role[this.currentUser.roles[0]];

    let userInfoObservable: any = null;
    switch (this.currentUserRole)
    {
      case Role.ROLE_PATIENT:
      {
        userInfoObservable = this.patientService.getAccountDetailsById(BigInt(this.currentUser.id));
        break;
      }

      case Role.ROLE_DOCTOR:
      {
        userInfoObservable = this.employeeService.getAccountDetailsById(this.currentUser.id);
        break;
      }

      case Role.ROLE_ADMIN:
      {
        userInfoObservable = this.userService.getAccountDetailsById(this.currentUser.id);
        break;
      }
    }

    let subscription = userInfoObservable.subscribe({
      next: (data) =>
      {
        this.currentUserInfo = data;
      },
      error: (error) =>
      {
        this.popUpMessageService.displayError(error);
        this.dialogRef.close();
      },
      complete: () =>
      {
        subscription.unsubscribe();
      }
    });
  }

  onSubmit()
  {
    let updateResultObservable: Observable<string> = null;
    switch(this.currentUserRole)
    {
      case Role.ROLE_PATIENT:
      {
        updateResultObservable = this.patientService.update(this.currentUserInfo as Patient);
        break;
      }

      case Role.ROLE_DOCTOR:
      {
        updateResultObservable = this.employeeService.update(this.currentUserInfo);
        break;
      }

      case Role.ROLE_ADMIN:
      {
        updateResultObservable = this.userService.update(this.currentUserInfo as User);
        break;
      }
    }

    let subscription = updateResultObservable.subscribe({
      next: (data: string) => 
      {
        this.popUpMessageService.displayConfirmation("Информация сохранена");
      },
      error: (error) =>
      {
        this.popUpMessageService.displayError(error);
      },
      complete: () =>
      {
        subscription.unsubscribe();
        this.dialogRef.close(true);
      }
    });
  }

  closeDialog(): void
  {
    this.dialogRef.close(false);
  }
}
