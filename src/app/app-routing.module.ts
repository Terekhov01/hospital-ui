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
import {AppointmentCreationComponent} from "./appointment-creation/appointment-creation.component";
import { ScheduleProlongPageComponent } from './schedule-prolong-page/schedule-prolong-page.component';
import { ScheduleSpecifyAppointmentPageComponent } from './schedule-specify-appointment-page/schedule-specify-appointment-page.component';
import { ScheduleTablePageComponent } from './schedule-table-page/schedule-table-page.component';


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
import {ScheduleTableComponent} from "./schedule-table/schedule-table.component";
import {ScheduleFilterComponent} from "./schedule-filter/schedule-filter.component";
import {ScheduleAppointmentBlockComponent} from "./schedule-appointment-block/schedule-appointment-block.component";
import {MaterialDateRangePickerComponent} from "./material-date-range-picker/material-date-range-picker.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {DoctorScheduleAppointmentsDataDaily} from "./schedule-appointment-block/schedule-appointment.i-raw-data";
import { AppointmentRegistrationInfoService } from "./appointment-registration-info.service";

const routes: Routes = [
  {path: '', redirectTo: 'appointmentRegistrations', pathMatch: 'full'},
  {path: "appointments", component: AppointmentListComponent},
  {path: "create-appointment", component: CreateAppointmentComponent},
  {path: "update-appointment/:id", component: UpdateAppointmentComponent},
  {path: "create-appointment-registration", component: CreateAppointmentRegistrationComponent},
  {path: "update-appointment-registration/:id", component: UpdateAppointmentRegistrationComponent},
  {path: "appointmentRegistrations", component: AppointmentRegistrationListComponent},
  {path: "appointment-details/:id", component: AppointmentDetailsComponent},
  {path: "appointment-registration-details/:id", component: AppointmentRegistrationDetailsComponent},
  {path: "appointment-creation/:id", component: AppointmentCreationComponent},
  {path: "schedule-table", component: ScheduleTableComponent},
  {path: "schedule-filter", component: ScheduleFilterComponent},
  {path: "schedule-appointment-block", component: ScheduleAppointmentBlockComponent},
  {path: "material-date-range-picker", component: MaterialDateRangePickerComponent},
  {
    path: "schedule",
    children:
      [
        { path: "doctorsTable", component: ScheduleTablePageComponent },
        { path: "specifyAppointment", component: ScheduleSpecifyAppointmentPageComponent },
        { path: "edit", component: ScheduleProlongPageComponent}
      ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
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
    ScrollingModule,]
})
export class AppRoutingModule { }
