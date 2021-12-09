import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ScheduleTablePageComponent } from './schedule-table-page/schedule-table-page.component';
import { ScheduleFilterComponent } from './schedule-filter/schedule-filter.component';
import { ScheduleAppointmentBlockComponent } from './schedule-appointment-block/schedule-appointment-block.component';
import { MaterialDateRangePickerComponent } from './material-date-range-picker/material-date-range-picker.component';
import { ScheduleSpecifyAppointmentPageComponent } from './schedule-specify-appointment-page/schedule-specify-appointment-page.component';
import { ScheduleProlongPageComponent } from './schedule-prolong-page/schedule-prolong-page.component';
import { ApplySchedulePatternComponent } from './apply-schedule-pattern/apply-schedule-pattern.component';
//import { MaterialMultiSelectorComponent } from './material-multi-selector/material-multi-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { OurdoctorsComponent } from './ourdoctors/ourdoctors.component';
import { OurdoctorsdetailsComponent } from './ourdoctorsdetails/ourdoctorsdetails.component';
import { OrderByPipe } from './order-by.pipe';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorComponent } from './user/user/doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    CreateEmployeeComponent,
    EmployeeDetailsComponent,
    ScheduleTablePageComponent,
    ScheduleFilterComponent,
    ScheduleAppointmentBlockComponent,
    MaterialDateRangePickerComponent,
    ScheduleSpecifyAppointmentPageComponent,
    ScheduleProlongPageComponent,
    ApplySchedulePatternComponent,
    DoctorComponent,
    AddDoctorComponent,
    OrderByPipe,
    UpdateDoctorComponent,
    OurdoctorsComponent,
    OurdoctorsdetailsComponent
    //MaterialMultiSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    NgxMaterialTimepickerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
