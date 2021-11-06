import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import {CreateAppointmentComponent} from "./create-appointment/create-appointment.component";
import {CreateAppointmentRegistrationComponent} from "./create-appointment-registration/create-appointment-registration.component";
import {AppointmentRegistrationListComponent} from "./appointment-registration-list/appointment-registration-list.component";
import {UpdateAppointmentComponent} from "./update-appointment/update-appointment.component";
import {UpdateAppointmentRegistrationComponent} from "./update-appointment-registration/update-appointment-registration.component";
import {AppointmentDetailsComponent} from "./appointment-details/appointment-details.component";
import {AppointmentRegistrationDetailsComponent} from "./appointment-registration-details/appointment-registration-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'appointmentRegistrations', pathMatch: 'full'},
  {path: "appointments", component: AppointmentListComponent},
  {path: "create-appointment", component: CreateAppointmentComponent},
  {path: "update-appointment/:id", component: UpdateAppointmentComponent},
  {path: "create-appointment-registration", component: CreateAppointmentRegistrationComponent},
  {path: "update-appointment-registration/:id", component: UpdateAppointmentRegistrationComponent},
  {path: "appointmentRegistrations", component: AppointmentRegistrationListComponent},
  {path: "appointment-details/:id", component: AppointmentDetailsComponent},
  {path: "appointment-registration-details/:id", component: AppointmentRegistrationDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
