import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FormsModule } from "@angular/forms";
import { AppointmentRegistrationListComponent } from './appointment-registration-list/appointment-registration-list.component';
import { CreateAppointmentRegistrationComponent } from './create-appointment-registration/create-appointment-registration.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { UpdateAppointmentRegistrationComponent } from './update-appointment-registration/update-appointment-registration.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentRegistrationDetailsComponent } from './appointment-registration-details/appointment-registration-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    CreateAppointmentComponent,
    AppointmentRegistrationListComponent,
    CreateAppointmentRegistrationComponent,
    UpdateAppointmentComponent,
    UpdateAppointmentRegistrationComponent,
    AppointmentDetailsComponent,
    AppointmentRegistrationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
