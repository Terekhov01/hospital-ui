import {Component, OnDestroy, OnInit} from '@angular/core';
import {Appointment, AppointmentCreationDTO} from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {Doctor} from "../doctor";
import {Patient} from "../patient";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DoctorService} from "../_services/doctor.service";
import {PatientService} from "../patient.service";
import {DatePipe} from "@angular/common";
import { PopUpMessageService } from '../_services/pop-up-message.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit, OnDestroy {

  appointment: Appointment = new Appointment();
  start: Date;
  end: Date;
  address: string;
  room: string;
  doctor: string;
  patient: string
  appointmentRegistrations: AppointmentRegistration[] = [];
  isLoaded: boolean;
  isFormLoaded: boolean;

  //--------------------------------------------------------------------------------------------------------------------

  appointmentDTO: AppointmentCreationDTO = new AppointmentCreationDTO();
  // start: Date;
  // end: Date;
  // address: string;
  // room: string;
  // doctor: string;
  // patient: string
  appointmentRegistration: AppointmentRegistration = new AppointmentRegistration();
  id: bigint;
  file: Blob;
  files: Blob[] = [];
  sickLeaveStartDate = new Date();
  sickLeaveDatePickerFormGroup = this.formBuilder.group(
    {
      sickLeaveDatePickerFormControl: new FormControl()
    });

  sickLeaveButtonDisabled = true;
  sickLeaveButtonToggled = false;
  confirmationButtonDisabled = false;
  sickLeaveDatePickerSubscription: Subscription | undefined = undefined;

  filesToUpload: File[] = [];

  constructor(private appointmentService: AppointmentService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router, public datePipe: DatePipe,
              private popUpMessageService: PopUpMessageService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    //------------------------------------------------------------------------------------------------------------------

    this.isLoaded = false;
    this.isFormLoaded = false;
    let usr_role = window.sessionStorage.getItem("USER_ROLE")
    console.log("ROLE: " + usr_role)
    if (usr_role == "ROLE_DOCTOR") {
      this.appointmentRegistrationService.getDoctorAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointmentRegistrations = data;
      })
    } else if (usr_role == "ROLE_PATIENT") {
      this.appointmentRegistrationService.getPatientAppointmentRegistrations(BigInt(window.sessionStorage.getItem("USER_ID"))).subscribe(data => {
        this.isLoaded = true;
        this.appointmentRegistrations = data;
      })
    } else {
      this.popUpMessageService.displayError("Ошибка авторизации. Войдите на сайт");
      //alert("ERROR: UNAUTHORIZED")
    }
  }

  /*saveAppointment() {
    // this.appointment.doctor = new Doctor(this.doctor);
    // this.appointment.patient = new Patient(this.patient);
    this.appointment.appointmentRegistration = new AppointmentRegistration();
    this.appointment.appointmentRegistration.doctor = new Doctor("", "", "", "123", "", "", "", new Date(), "");
    this.appointment.appointmentRegistration.patient = new Patient("", "", BigInt(0), "", this.patient, "", "", "", "", "")
    this.doctorService.getDoctorByLastName(this.doctor).subscribe({
      next: (data) => {
      // this.appointment.doctor = data;
      this.appointment.appointmentRegistration.doctor = data;
      console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.patientService.getPatientByLastName(this.patient).subscribe({
      next: (data) => {
      // this.appointment.patient = data;
      this.appointment.appointmentRegistration.patient = data;
      console.log(data);
      },
      error: error => console.log(error)
    });

    this.appointmentRegistrationService.getAppointmentRegistrationByDocAndPat(this.doctor, this.patient).subscribe({
      next: (data) => {
        this.appointment.appointmentRegistration = data;
        console.log(data);
      },
      error: (error) => console.log(error)
    });

    this.appointment.appointmentRegistration.room = this.room;
    this.appointment.appointmentRegistration.address = this.address;
    this.appointment.appointmentRegistration.start = this.start;
    this.appointment.appointmentRegistration.end = this.end;

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (data) => {
      console.log(data);
      this.goToAppointmentList();
      },
      error: (error) => console.log(error)
    });
  }*/

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
  }

  SelectAppointmentRegistration(content, id: number) {
    this.initCreationForm(id)
    this.modalService.open(content, { size: 'xl', centered: true });
    // let result = this.router.navigate(['appointment-creation', id]);
  }

  async initCreationForm(id: number) {
    this.isFormLoaded = false;
    this.appointmentDTO = new AppointmentCreationDTO();
    // this.id = this.route.snapshot.params['id'];
    this.id = BigInt(id);
    this.appointmentDTO.appointmentRegistrationId = this.id;
    let appointmentRegistrationSubscription = this.appointmentRegistrationService.getAppointmentRegistrationByID(this.id).subscribe({
      next: (data) => {
        this.appointmentRegistration = data;
      },
      complete: () => {
        appointmentRegistrationSubscription.unsubscribe();
      }
    })

    this.sickLeaveDatePickerSubscription = this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').valueChanges.subscribe({
      next: (value) => {
        if (this.sickLeaveButtonToggled) {
          this.sickLeaveButtonDisabled = false;
        } else if (this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').valid && value != null) {
          this.sickLeaveButtonDisabled = false;
        } else {
          this.sickLeaveButtonDisabled = true;
        }
      },
      error: (error) => {
        console.log("ERROR 1")
        this.popUpMessageService.displayError(error);
        //alert(error.toString());
      }
    });
    await delay(1500);
    this.isFormLoaded = true;
  }

  ngOnDestroy(): void
  {
    this.sickLeaveDatePickerSubscription.unsubscribe();
  }

  saveAppointment() {
    this.appointmentDTO.sickListNeeded = this.sickLeaveButtonToggled;

    if (this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').valid)
    {
      this.appointmentDTO.recoveryDate = this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').value;
    }
    else
    {
      if (this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').disabled)
      {
        this.appointmentDTO.recoveryDate = this.sickLeaveDatePickerFormGroup.getRawValue().sickLeaveDatePickerFormControl;
      }
      else
      {
        this.appointmentDTO.recoveryDate = null;
      }
    }

    this.appointmentDTO.filesToUpload = [];
    for (let file of this.filesToUpload)
    {
      this.appointmentDTO.filesToUpload.push(file);
    }

    let uploadSubscription = this.appointmentService.createAppointment(this.appointmentDTO).subscribe({
      next: (value) =>
      {
        this.popUpMessageService.displayConfirmation("Результаты приема записаны");
        //alert("Результаты приема записаны");
      },
      error: (error) =>
      {
        this.popUpMessageService.displayError(error);

        /*if (error.error.message !== undefined)
        {
          alert(error.error.message);
        }
        else
        {
          alert(error.error);
        }*/
        this.confirmationButtonDisabled = false;
      },
      complete: () =>
      {
        this.confirmationButtonDisabled = false;
        uploadSubscription.unsubscribe();
        this.goToAppointmentList();
      }
    });
  }

  sickLeaveButtonClicked(): void
  {
    this.sickLeaveButtonToggled = !this.sickLeaveButtonToggled;

    if (this.sickLeaveButtonToggled)
    {
      this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').disable();
      this.popUpMessageService.displayConfirmation("Больничный прикреплен");
      //alert("Больничный прикреплен");
    }
    else
    {
      this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').enable();
      this.popUpMessageService.displayConfirmation("Больничный откреплен");
      //alert("Больничный откреплен");
    }
  }

  handleFileInput(files: FileList)
  {
    for (let i = 0; i < files.length; i++)
    {
      this.filesToUpload.push(files.item(i));
    }
  }

  confirmationButtonClicked()
  {
    this.confirmationButtonDisabled = true;
    this.saveAppointment();
    this.goToAppointmentList();
  }

  MedCard(id: bigint){
    let result = this.router.navigate(['medCard', id]);
  }


  /*onSubmit() {
    console.log(this.appointment);
    this.saveAppointment();
  }*/

}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
