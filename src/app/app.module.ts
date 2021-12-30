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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import { ScheduleViewPatternComponent } from './schedule-view-pattern/schedule-view-pattern.component';

import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentRegistrationListComponent } from './appointment-registration-list/appointment-registration-list.component';
import { CreateAppointmentRegistrationComponent } from './create-appointment-registration/create-appointment-registration.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { UpdateAppointmentRegistrationComponent } from './update-appointment-registration/update-appointment-registration.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentRegistrationDetailsComponent } from './appointment-registration-details/appointment-registration-details.component';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { AppointmentCreationComponent } from './appointment-creation/appointment-creation.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {AppointmentRegistrationInfoService} from "./appointment-registration-info.service";
import {DoctorScheduleAppointmentsDataDaily} from "./schedule-appointment-block/schedule-appointment.i-raw-data";
import {DoctorSharedShortInformationService} from "./doctor-shared-short-information.service";
import {DatePipe} from '@angular/common';
import { MedCardComponent } from './med-card/med-card.component';
import { HereditaryComponent } from './hereditary/hereditary.component';
import { ContrComponent } from './contr/contr.component';
import { EditHereditaryComponent } from './edit-hereditary/edit-hereditary.component';
import { EditContrComponent } from './edit-contr/edit-contr.component';
import { MainComponent } from './main/main.component';

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
    OurdoctorsdetailsComponent,
    AppointmentListComponent,
    CreateAppointmentComponent,
    AppointmentRegistrationListComponent,
    CreateAppointmentRegistrationComponent,
    UpdateAppointmentComponent,
    UpdateAppointmentRegistrationComponent,
    AppointmentDetailsComponent,
    AppointmentRegistrationDetailsComponent,
    AppointmentCreationComponent,
    OurdoctorsdetailsComponent,
    ScheduleViewPatternComponent,
    MedCardComponent,
    HereditaryComponent,
    ContrComponent,
    EditHereditaryComponent,
    EditContrComponent,
    MainComponent,
    //MaterialMultiSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
  exports: [
    A11yModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
  ]
})
export class AppModule { }
