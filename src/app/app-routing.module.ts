import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorComponent} from "./DoctorInList/doctorList/doctor.component";
import {AddDoctorComponent} from "./AddNewDoctorInList/add-doctor.component";
import {UpdateDoctorComponent} from "./UpdateDoctorInList/update-doctor.component";
import {OurdoctorsComponent} from "./OurDoctors/ourdoctors.component";
import {OurdoctorsdetailsComponent} from "./OurDoctorsAddRating/ourdoctorsdetails.component";
import {DoctorinfoComponent} from "./OurDoctorsMoreInfo/doctorinfo.component";

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
