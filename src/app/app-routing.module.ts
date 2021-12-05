import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ScheduleTablePageComponent } from "./schedule-table-page/schedule-table-page.component";
import { ScheduleSpecifyAppointmentPageComponent } from "./schedule-specify-appointment-page/schedule-specify-appointment-page.component";
import { ScheduleProlongPageComponent } from "./schedule-prolong-page/schedule-prolong-page.component";

const routes: Routes =
[
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'admin', component: EmployeeListComponent },
    { path: 'update-employee/:id', component: UpdateEmployeeComponent },
    { path: 'create-employee', component: CreateEmployeeComponent },
    { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    { 
      path: "schedule",
      children:
      [
        { path: "doctorsTable", component: ScheduleTablePageComponent },
        { path: "specifyAppointment", component: ScheduleSpecifyAppointmentPageComponent },
        { path: "edit", component: ScheduleProlongPageComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
