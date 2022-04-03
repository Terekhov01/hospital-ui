import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {Employee} from '../employee';
import {EmployeeService} from '../_services/employee.service';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { UserService } from '../_services/user.service';
import { PopUpMessageService } from '../_services/pop-up-message.service';
import { User, Role } from '../user';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateprofileComponent } from '../updateprofile/updateprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    phone: ""
  };

  constructor(private token: TokenStorageService, private employeeService: EmployeeService, private patientService: PatientService,
    private userService: UserService, private popUpMessageService: PopUpMessageService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.currentUserRole = Role[this.currentUser.roles[0]];
    this.getUserInfo();
  }

  getUserInfo(): void
  {
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
      },
      complete: () =>
      {
        subscription.unsubscribe();
      }
    });
  }

  onSubmit()
  {
  }

  updateProfile()
  {
    let dialogRef: MatDialogRef<unknown, any> = null;

    switch(this.currentUserRole)
    {
      case Role.ROLE_PATIENT:
      {
          dialogRef = this.dialog.open(UpdateprofileComponent, {
            width: '400px'
          });
        //this.router.navigate(['updateprofile', this.currentUserInfo.patientId]);
        break;
      }

      case Role.ROLE_DOCTOR:
      {
        dialogRef = this.dialog.open(UpdateprofileComponent, {
          width: '400px'
        });
        //this.router.navigate(['updateprofile', this.currentUserInfo.doctorId]);
        break;
      }

      case Role.ROLE_ADMIN:
      {
        dialogRef = this.dialog.open(UpdateprofileComponent, {
          width: '400px'
        });
        //this.router.navigate(['updateprofile', this.currentUserInfo.id]);
        break;
      }
    }

    let dialogSubscription = dialogRef.afterClosed().subscribe({
      next: (isProfileDirty: boolean) =>
      {
        if (isProfileDirty == true)
        {
          this.getUserInfo();
        }
      },
      complete: () =>
      {
        dialogSubscription.unsubscribe();
      }
    });
  }

  MedCard()
  {
    if (this.currentUserInfo.patientId == undefined)
    {
      this.popUpMessageService.displayError("Внутренняя ошибка. Только пациенты могут просматривать медицинскую карту");
      return;
    }

    // Which id shall I pass here?
    this.router.navigate(['medCard', this.currentUserInfo.id]);
  }
}
