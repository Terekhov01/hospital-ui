import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// import { registerLocaleData } from '@angular/common';
// import localeRu from '@angular/common/locales/ru';
//
// registerLocaleData(localeRu);

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter,MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {DoctorService} from "./DoctorInList/doctorList/doctor.service";
import { DataTablesModule } from 'angular-datatables';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CreatePatientComponent} from './create-patient/create-patient.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';

import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {CustomDateAdapter } from './common-utility-classes/custom-date-adapter';
import {ScheduleTablePageComponent} from './schedule-table-page/schedule-table-page.component';
import {ScheduleFilterComponent} from './schedule-filter/schedule-filter.component';
import {ScheduleAppointmentBlockComponent} from './schedule-appointment-block/schedule-appointment-block.component';
import {ScheduleTransferDataComponent } from './schedule-transfer-data/schedule-transfer-data.component';
import { ScheduleCreatePatternComponent } from './schedule-create-pattern/schedule-create-pattern.component';
import { ScheduleApplyPatternComponent } from "./schedule-apply-pattern/schedule-apply-pattern.component";
import {MaterialDateRangePickerComponent} from './material-date-range-picker/material-date-range-picker.component';
import {ScheduleSpecifyAppointmentPageComponent} from './schedule-specify-appointment-page/schedule-specify-appointment-page.component';
import {MatSelectModule} from '@angular/material/select';
import {OurdoctorsComponent} from './OurDoctorsInClinic/ourdoctors.component';
import {OurdoctorsdetailsComponent} from './ourdoctorsdetails/ourdoctorsdetails.component';
import {OrderByPipe} from './order-by.pipe';

import {AppointmentListComponent} from './appointment-list/appointment-list.component';
import {CreateAppointmentComponent} from './create-appointment/create-appointment.component';
import {AppointmentRegistrationListComponent} from './appointment-registration-list/appointment-registration-list.component';
import {CreateAppointmentRegistrationComponent} from './create-appointment-registration/create-appointment-registration.component';
import {UpdateAppointmentComponent} from './update-appointment/update-appointment.component';
import {UpdateAppointmentRegistrationComponent} from './update-appointment-registration/update-appointment-registration.component';
import {AppointmentDetailsComponent} from './appointment-details/appointment-details.component';
import {AppointmentRegistrationDetailsComponent} from './appointment-registration-details/appointment-registration-details.component';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
import {DoctorSharedShortInformationService} from "./doctor-shared-short-information.service";
import {CommonModule, DatePipe} from '@angular/common';
// import { MedCardComponent } from './med-card/med-card.component';
// import { HereditaryComponent } from './hereditary/hereditary.component';
// import { ContrComponent } from './contr/contr.component';
// import { EditHereditaryComponent } from './edit-hereditary/edit-hereditary.component';
// import { EditContrComponent } from './edit-contr/edit-contr.component';
// import { MainComponent } from './main/main.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DoctorinfoComponent } from "./OurDoctorsMoreInfo/doctorinfo.component";
// import { DoctorComponent } from "./DoctorInList/doctorList/doctor.component";
// import { AddDoctorComponent } from "./AddNewDoctorInList/add-doctor.component";
// import { UpdateDoctorComponent } from "./UpdateDoctorInList/update-doctor.component";
// import { SafePipe } from './safe.pipe';
// import { FileViewerComponent } from './file-viewer/file-viewer.component';
// import { MaterialMultiSelectorComponent } from './doctor-selector/doctor-selector.component';
// import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from "@ngx-translate/core";
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { FileTransferDataComponent } from './file-transfer-data/file-transfer-data.component';
// import { MedCardComponent } from './med-card/med-card.component';
// import { HereditaryComponent } from './hereditary/hereditary.component';
// import { ContrComponent } from './contr/contr.component';
// import { EditHereditaryComponent } from './edit-hereditary/edit-hereditary.component';
// import { EditContrComponent } from './edit-contr/edit-contr.component';
// import { MainComponent } from './main/main.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DoctorinfoComponent } from "./OurDoctorsMoreInfo/doctorinfo.component";
// import { DoctorComponent } from "./DoctorInList/doctorList/doctor.component";
// import { AddDoctorComponent } from "./AddNewDoctorInList/add-doctor.component";
// import { UpdateDoctorComponent } from "./UpdateDoctorInList/update-doctor.component";
import { SafePipe } from './safe.pipe';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MaterialMultiSelectorComponent } from './doctor-selector/doctor-selector.component';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from "@ngx-translate/core";
import {MedCardComponent} from './med-card/med-card.component';
import {HereditaryComponent} from './hereditary/hereditary.component';
import {ContrComponent} from './contr/contr.component';
import {EditHereditaryComponent} from './edit-hereditary/edit-hereditary.component';
import {EditContrComponent} from './edit-contr/edit-contr.component';
import {MainComponent} from './main/main.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DoctorinfoComponent} from "./OurDoctorsMoreInfo/doctorinfo.component";
import {DoctorComponent} from "./DoctorInList/doctorList/doctor.component";
import {AddDoctorComponent} from "./AddNewDoctorInList/add-doctor.component";
import {UpdateDoctorComponent} from "./UpdateDoctorInList/update-doctor.component";
import {DoctorStatisticLineComponent} from './doctor-statistic-single/doctor-statistic-line.component';
import {NgChartsModule} from "ng2-charts";
// import { DoctorStatisticEmploymentComponent } from './doctor-statistic-employment/doctor-statistic-employment.component';
import { LocalChatComponent } from './local-chat/local-chat.component';
import { SendQuestionEmailComponent } from './send-question-email/send-question-email.component';
import { ResponceemailComponent } from './send-question-email/responceemail/responceemail.component';
//

import {NgbdSortableHeader} from "./create-appointment/sortable.directive";

@NgModule({
  declarations: [
    NgbdSortableHeader,
    // PdfViewerComponent,
    SafePipe,
    AppComponent,
    LoginComponent,
    CreatePatientComponent,
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
    MaterialMultiSelectorComponent,
    ScheduleSpecifyAppointmentPageComponent,
    ScheduleCreatePatternComponent,
    ScheduleApplyPatternComponent,
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
    MedCardComponent,
    HereditaryComponent,
    ContrComponent,
    EditHereditaryComponent,
    EditContrComponent,
    MainComponent,
    ScheduleTransferDataComponent,
    DoctorinfoComponent,
    UpdateDoctorComponent,
    SafePipe,
    FileViewerComponent,
    UpdateDoctorComponent,
    DoctorStatisticLineComponent,
    // DoctorStatisticEmploymentComponent,
    LocalChatComponent,
    SendQuestionEmailComponent,
    ResponceemailComponent,

    UpdateprofileComponent,
    FileTransferDataComponent,
    CreateAppointmentComponent,
    NgbdSortableHeader
  ],
  imports: [
    TranslateModule.forRoot(),
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    BrowserModule,

    NgChartsModule,
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
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    Ng2SearchPipeModule,
    NgbModule
,
    DataTablesModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
  ],
  providers: [authInterceptorProviders,
    DatePipe,
    DoctorService,
    TranslateService,
    TranslateStore,
    // { provide: LOCALE_ID, useValue: "en" }
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule,
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
export class AppModule {
}
