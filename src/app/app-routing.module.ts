import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user/user.component";
import {AddUserComponent} from "./add-doctor/add-user.component";
import {UpdateDoctorComponent} from "./update-doctor/update-doctor.component";

const routes: Routes = [
  { path: 'doctor-users', component: UserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'update-doctor', component: UpdateDoctorComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
