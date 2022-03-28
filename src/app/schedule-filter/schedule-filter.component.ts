import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../_services/doctor-shared-short-information.service';
import { DoctorShortInformationFormControls } from './doctor-short-information-form-controls';
import { DoctorShortInformation } from '../schedule-transfer-data/schedule-filter.data-transfer-objects';
import { FilterSettings } from './schedule-filter.filter-settings';
import { PickedDates } from '../material-date-range-picker/material-date-range-picker.component';
import { AppointmentRegistrationInfoService } from "../appointment-registration-info.service";
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
    selector: 'app-schedule-filter',
    templateUrl: './schedule-filter.component.html',
    styleUrls: ['./schedule-filter.component.css']
})
export class ScheduleFilterComponent implements OnInit, OnDestroy
{
    //public doctorsShortInformationSubject = new BehaviorSubject<DoctorShortInformation[]>([]);
    private doctorShortInformationSubscription: Subscription | undefined;
    public doctorShortInformationFormControl: DoctorShortInformationFormControls = new DoctorShortInformationFormControls(this.popUpMessageService);
    private pickedDates = new PickedDates(undefined, undefined);

    constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService,
        private appointmentRegistrationInfoService: AppointmentRegistrationInfoService, private popUpMessageService: PopUpMessageService)
    {
    }

    ngOnInit(): void
    {
        let doctorsShortInformationSubject = new BehaviorSubject<DoctorShortInformation[]>([]);
        //Subscribe to doctor short information (includes name, specialization and id)
        this.doctorShortInformationSubscription = this.doctorShortInfoService.getDoctorShortInformationObservables(undefined)/*.pipe(
            catchError((error) =>
            {
                console.error();
                alert("Server inacessible or data malformed! Cannot load list of doctors available.");
                return of([]);
            })
        )*/.subscribe(
        {
            next: IDoctorShortInformationArray =>
            {
                let doctorShortInformationArray = <DoctorShortInformation[]>([]);
                for (let doctorShortInformation of IDoctorShortInformationArray)
                {
                    doctorShortInformationArray.push(new DoctorShortInformation(doctorShortInformation));
                }
                doctorsShortInformationSubject.next(doctorShortInformationArray);
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert(error.error);
            },
            complete: () =>
            {
                this.doctorShortInformationFormControl.setDoctorShortInfoList(doctorsShortInformationSubject);
            }
        });
    }

    ngOnDestroy(): void
    {
        this.doctorShortInfoService.setRequestedInfo(null);
    }

    checkInputAndPresentAppointmentDates(): void
    {
        let startDate = this.pickedDates.getStartDate();
        let endDate = this.pickedDates.getEndDate();
        if (this.doctorShortInformationFormControl.doctorShortInformationFormControl.valid
                    && startDate != undefined
                    && endDate != undefined)
        {
            let pickedDoctorShortInfo = <DoctorShortInformation>this.doctorShortInformationFormControl.getFormControl().value;
            this.appointmentRegistrationInfoService.changeDoctorName(pickedDoctorShortInfo.lastName);
            this.appointmentRegistrationInfoService.changeDoctorId(BigInt(pickedDoctorShortInfo.id));
            this.doctorShortInfoService.setRequestedInfo(new FilterSettings(pickedDoctorShortInfo.id, startDate, endDate));
        }
        else
        {
            this.popUpMessageService.displayWarning("Фильтры содержат незаполненные поля или некорректные значения");
        }
    }

    calendarDateRangeChanged(pickedDates: PickedDates)
    {
        this.pickedDates = pickedDates;
    }
}
