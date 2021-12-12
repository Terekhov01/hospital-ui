import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorComponent} from "./user/user/doctor.component";
import {AddDoctorComponent} from "./add-doctor/add-doctor.component";
import {UpdateDoctorComponent} from "./update-doctor/update-doctor.component";
import {OurdoctorsComponent} from "./ourdoctors/ourdoctors.component";
import {OurdoctorsdetailsComponent} from "./ourdoctorsdetails/ourdoctorsdetails.component";
import {DoctorinfoComponent} from "./doctorinfo/doctorinfo.component";

const routes: Routes = [
  {path: 'doctorlist', component: DoctorComponent},
  {path: 'doctoradd', component: AddDoctorComponent},
  {path: 'update-doctor/:id', component: UpdateDoctorComponent},
  {path: 'ourdoctors', component: OurdoctorsComponent},
  {path: 'ourDoctorsDetails/:id', component: OurdoctorsdetailsComponent},
  {path: 'doctorInfo/:id', component: DoctorinfoComponent},
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
export class AppRoutingModule {
}
