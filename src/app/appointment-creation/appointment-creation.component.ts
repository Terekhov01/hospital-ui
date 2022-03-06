import { Component, OnInit, EventEmitter, OnDestroy  } from '@angular/core';
import { AppointmentCreationDTO, FileDTO } from "../appointment";
import {AppointmentService} from "../appointment.service";
import {Router} from "@angular/router";
import {AppointmentRegistration} from "../appointment-registration";
import {AppointmentRegistrationService} from "../appointment-registration.service";
import {DoctorService} from "../_services/doctor.service";
import {PatientService} from "../patient.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { E } from '@angular/cdk/keycodes';
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.css']
})
export class AppointmentCreationComponent implements OnInit, OnDestroy {

  appointmentDTO: AppointmentCreationDTO = new AppointmentCreationDTO();
  start: Date;
  end: Date;
  address: string;
  room: string;
  doctor: string;
  patient: string
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
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private popUpMessageService: PopUpMessageService) { }

  ngOnInit(): void {
    this.appointmentDTO = new AppointmentCreationDTO();
    this.id = this.route.snapshot.params['id'];
    this.appointmentDTO.appointmentRegistrationId = this.id;
    let appointmentRegistrationSubscription = this.appointmentRegistrationService.getAppointmentRegistrationByID(this.id).subscribe({
      next: (data) => {
      this.appointmentRegistration = data;
      },
      complete: () =>
      {
        appointmentRegistrationSubscription.unsubscribe();
      }
    })

    this.sickLeaveDatePickerSubscription = this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').valueChanges.subscribe({
      next: (value) =>
      {
        if (this.sickLeaveButtonToggled)
        {
          this.sickLeaveButtonDisabled = false;
        }
        else if (this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').valid && value != null)
        {
          this.sickLeaveButtonDisabled = false;
        }
        else
        {
          this.sickLeaveButtonDisabled = true;
        }
      },
      error: (error) =>
      {
        console.log("ERROR 1")
        this.popUpMessageService.displayError(error);
        //alert(error.toString());
      }
    });
  }

  ngOnDestroy(): void
  {
      this.sickLeaveDatePickerSubscription.unsubscribe();
  }

  goToAppointmentList() {
    this.router.navigate(['/appointments']);
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
  }
}
