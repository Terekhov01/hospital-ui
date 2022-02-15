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
  sickLeaveDatePickerSubscription: Subscription | undefined = undefined;

  fileToUpload: File | null = null;

  constructor(private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private appointmentRegistrationService: AppointmentRegistrationService,
              private router: Router,
              private formBuilder: FormBuilder) { }

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

    // document.body.appendChild(this.sickLeaveDatePickerFormGroup)

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
        alert(error.toString());
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

    if (this.fileToUpload !== null)
    {
      this.appointmentDTO.filesToUpload.push(this.fileToUpload);
    }

    let uploadSubscription = this.appointmentService.createAppointment(this.appointmentDTO).subscribe({
      next: (value) =>
      {
        alert("Результаты приема записаны");
      },
      error: (error) =>
      {
        console.log("ERROR 2")
        console.log(error);
        alert(error.toString());
      },
      complete: () =>
      {
        uploadSubscription.unsubscribe();
      }
    });
  }

  sickLeaveButtonClicked(): void
  {
    this.sickLeaveButtonToggled = !this.sickLeaveButtonToggled;

    if (this.sickLeaveButtonToggled)
    {
      this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').disable();
      alert("Больничный прикреплен");
    }
    else
    {
      this.sickLeaveDatePickerFormGroup.get('sickLeaveDatePickerFormControl').enable();
      alert("Больничный откреплен");
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  confirmationButtonClicked()
  {
    console.log(this.appointmentDTO);
    this.saveAppointment();

    this.goToAppointmentList();
  }
}
