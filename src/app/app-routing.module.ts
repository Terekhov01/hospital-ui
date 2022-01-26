import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DoctorinfoComponent} from "./OurDoctorsMoreInfo/doctorinfo.component";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
// import { DoctorComponent } from "./user/user/doctor.component";
// import { AddDoctorComponent } from "./add-doctor/add-doctor.component";
// import { UpdateDoctorComponent } from "./update-doctor/update-doctor.component";
import { OurdoctorsComponent } from "./OurDoctorsInClinic/ourdoctors.component";
import { OurdoctorsdetailsComponent } from "./ourdoctorsdetails/ourdoctorsdetails.component";
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import {CreateAppointmentComponent} from "./create-appointment/create-appointment.component";
import {CreateAppointmentRegistrationComponent} from "./create-appointment-registration/create-appointment-registration.component";
import {AppointmentRegistrationListComponent} from "./appointment-registration-list/appointment-registration-list.component";
import {UpdateAppointmentComponent} from "./update-appointment/update-appointment.component";
import {UpdateAppointmentRegistrationComponent} from "./update-appointment-registration/update-appointment-registration.component";
import {AppointmentDetailsComponent} from "./appointment-details/appointment-details.component";
import {AppointmentRegistrationDetailsComponent} from "./appointment-registration-details/appointment-registration-details.component";
import {AppointmentCreationComponent} from "./appointment-creation/appointment-creation.component";
import { ScheduleCreatePatternComponent } from './schedule-create-pattern/schedule-create-pattern.component';
import { ScheduleSpecifyAppointmentPageComponent } from './schedule-specify-appointment-page/schedule-specify-appointment-page.component';
import { ScheduleTablePageComponent } from './schedule-table-page/schedule-table-page.component';
import { MedCardComponent } from "./med-card/med-card.component";
import { HereditaryComponent } from "./hereditary/hereditary.component";
import { ContrComponent } from "./contr/contr.component";
import { EditHereditaryComponent } from "./edit-hereditary/edit-hereditary.component";
import { EditContrComponent } from "./edit-contr/edit-contr.component";
import { MainComponent } from "./main/main.component";
import { DoctorScheduleAppointmentsDataDaily } from "./schedule-transfer-data/schedule-appointment.data-transfer-objects";
import { AppointmentRegistrationInfoService } from "./appointment-registration-info.service";
import { MaterialMultiSelectorComponent } from "./doctor-selector/doctor-selector.component";

//import { MaterialMultiSelectorComponent } from './material-multi-selector/material-multi-selector.component';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {A} from "@angular/cdk/keycodes";
import {ScheduleFilterComponent} from "./schedule-filter/schedule-filter.component";
import {ScheduleAppointmentBlockComponent} from "./schedule-appointment-block/schedule-appointment-block.component";
import {MaterialDateRangePickerComponent} from "./material-date-range-picker/material-date-range-picker.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {DoctorComponent} from "./DoctorInList/doctorList/doctor.component";
import {AddDoctorComponent} from "./AddNewDoctorInList/add-doctor.component";
import {UpdateDoctorComponent} from "./UpdateDoctorInList/update-doctor.component";

const routes: Routes =
[
    { path: "medCard", component: MedCardComponent },
    { path: "medCard/hereditary", component: HereditaryComponent },
    { path: "medCard/contraindications", component: ContrComponent },
    { path: "medCard/edit-hereditary", component: EditHereditaryComponent },
    { path: "medCard/edit-contr", component: EditContrComponent },
    { path: "", component: MainComponent},
    //{ path: "", redirectTo: 'medCard', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'admin', component: EmployeeListComponent },
    { path: 'update-employee/:id', component: UpdateEmployeeComponent },
    { path: 'create-employee', component: CreateEmployeeComponent },
  {path: 'doctorlist', component: DoctorComponent},
  {path: 'doctoradd', component: AddDoctorComponent},
  {path: 'doctorInfo/:id', component: DoctorinfoComponent},

    { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    {
      path: "schedule",
      children:
      [
        { path: "doctorsTable", component: ScheduleTablePageComponent },
        { path: "specifyAppointment", component: ScheduleSpecifyAppointmentPageComponent },
        { path: "edit", component: ScheduleCreatePatternComponent }
      ]
    },
    { path: 'doctor-users', component: DoctorComponent },
    { path: 'add', component: AddDoctorComponent },
    { path: 'update-doctor/:id', component: UpdateDoctorComponent },
    { path: 'ourdoctors', component: OurdoctorsComponent },
    { path: 'ourDoctorsDetails/:id', component: OurdoctorsdetailsComponent },

    {path: "appointments", component: AppointmentListComponent},
    {path: "create-appointment", component: CreateAppointmentComponent},
    {path: "update-appointment/:id", component: UpdateAppointmentComponent},
    {path: "create-appointment-registration", component: CreateAppointmentRegistrationComponent},
    {path: "update-appointment-registration/:id", component: UpdateAppointmentRegistrationComponent},
    {path: "appointmentRegistrations", component: AppointmentRegistrationListComponent},
    {path: "appointment-details/:id", component: AppointmentDetailsComponent},
    {path: "appointment-registration-details/:id", component: AppointmentRegistrationDetailsComponent},
    {path: "appointment-creation/:id", component: AppointmentCreationComponent},
    { path: "testPath", component: MaterialMultiSelectorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    A11yModule,
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
export class AppRoutingModule { }
