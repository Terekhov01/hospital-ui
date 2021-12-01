import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorComponent} from "./user/user/doctor.component";
import {AddDoctorComponent} from "./add-doctor/add-doctor.component";
import {UpdateDoctorComponent} from "./update-doctor/update-doctor.component";
import {OurdoctorsComponent} from "./ourdoctors/ourdoctors.component";
import {OurdoctorsdetailsComponent} from "./ourdoctorsdetails/ourdoctorsdetails.component";

const routes: Routes = [
  { path: 'doctor-users', component: DoctorComponent },
  { path: 'add', component: AddDoctorComponent },
  { path: 'update-doctor/:id', component: UpdateDoctorComponent },
  { path: 'ourdoctors', component: OurdoctorsComponent },
  { path: 'ourDoctorsDetails/:id', component: OurdoctorsdetailsComponent },
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
