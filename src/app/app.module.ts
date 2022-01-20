import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DoctorComponent} from './DoctorInList/doctorList/doctor.component';
import {AddDoctorComponent} from './AddNewDoctorInList/add-doctor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DoctorService} from "./DoctorInList/doctorList/doctor.service";
import {OrderByPipe} from './order-by.pipe';
import {UpdateDoctorComponent} from './UpdateDoctorInList/update-doctor.component';
import {OurdoctorsComponent} from './OurDoctors/ourdoctors.component';
import {OurdoctorsdetailsComponent} from './OurDoctorsAddRating/ourdoctorsdetails.component';
import {DoctorinfoComponent} from './OurDoctorsMoreInfo/doctorinfo.component';
// import { SurnamefilterPipe } from './surnamefilter.pipe';
import {Ng2SearchPipeModule} from "ng2-search-filter";

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
    // SurnamefilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //---
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
