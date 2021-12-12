import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DoctorComponent} from './user/user/doctor.component';
import {AddDoctorComponent} from './add-doctor/add-doctor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DoctorService} from "./user/user/doctor.service";
import {OrderByPipe} from './order-by.pipe';
import {UpdateDoctorComponent} from './update-doctor/update-doctor.component';
import {OurdoctorsComponent} from './ourdoctors/ourdoctors.component';
import {OurdoctorsdetailsComponent} from './ourdoctorsdetails/ourdoctorsdetails.component';
import {DoctorinfoComponent} from './doctorinfo/doctorinfo.component';

// import {ourdoctorsModel } from './ourdoctors/ourdoctors.model';


@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    AddDoctorComponent,
    OrderByPipe,
    UpdateDoctorComponent,
    OurdoctorsComponent,
    OurdoctorsdetailsComponent,
    DoctorinfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
