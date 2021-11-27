import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorScheduleService } from '../doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../doctor-shared-short-information.service';
import { DoctorShortInformationFormControls } from './doctor-short-information-form-controls';
import { DoctorShortInformation } from './schedule-filter.i-raw-data';
import { FilterSettings } from './schedule-filter.filter-settings';
import { PickedDates } from '../material-date-range-picker/material-date-range-picker.component';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.css']
})
export class ScheduleFilterComponent implements OnInit
{
  //public doctorsShortInformationSubject = new BehaviorSubject<DoctorShortInformation[]>([]);
  private doctorShortInformationSubscription: Subscription | undefined;
  public doctorShortInformationFormControl: DoctorShortInformationFormControls = new DoctorShortInformationFormControls();
  private pickedDates = new PickedDates(undefined, undefined);

  constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService)
  {
  }

  ngOnInit(): void
  {
    let doctorsShortInformationSubject = new BehaviorSubject<DoctorShortInformation[]>([]);
    //Subscribe to doctor short information (includes name, specialization and id)
    this.doctorShortInformationSubscription = this.doctorShortInfoService.getDoctorShortInformationObservables(undefined).pipe(
      catchError((error) =>
      {
        console.error();
        alert("Server inacessible or data malformed! Cannot load list of doctors available.");
        return of([]);
      })
    ).subscribe(IDoctorShortInformationArray =>
      {
        let doctorShortInformationArray = <DoctorShortInformation[]>([]);
        for (let doctorShortInformation of IDoctorShortInformationArray)
        {
          doctorShortInformationArray.push(new DoctorShortInformation(doctorShortInformation));
        }
        doctorsShortInformationSubject.next(doctorShortInformationArray);
      }, (error) =>
      {
        alert("Error translating data from server! Cannot load list of doctors available.");
        console.error();
      },
      () =>
      {
        console.log("Recieving information successful");
        this.doctorShortInformationFormControl.setDoctorShortInfoList(doctorsShortInformationSubject);
      });
  }

  checkInputAndPresentAppointmentDates(): void
  {
    let startDate = this.pickedDates.getStartDate();
    let endDate = this.pickedDates.getEndDate();
    if (this.doctorShortInformationFormControl.doctorShortInformationFormControl.valid
      && startDate != undefined
      && endDate != undefined)
      /*&& this.datePickerGroup.value.daterange.start != null
      && this.datePickerGroup.value.daterange.end != null)*/
    {
      //console.log(this.doctorShortInformationFormControl.doctorShortInformationFormControl.value);
      console.log("Filter is valid!");
      for (let doctorShortInfo of this.doctorShortInformationFormControl.doctorShortInformationFiltered.value)
      {
        if (doctorShortInfo.toString() === this.doctorShortInformationFormControl.doctorShortInformationFormControl.value)
        {
          //After this function executes appointment forms pop up. See doctor-shared-short-information service
          this.doctorShortInfoService.setRequestedInfo(new FilterSettings(doctorShortInfo.id,
            startDate, endDate));
        }
      }
    }
    else
    {
      //TODO - draw nice pop-up menu
      alert("Filter is invalid!");
    }
  }

  calendarValueChanged(pickedDates: PickedDates)
  {
    this.pickedDates = pickedDates;
  }
}
