import { Component, OnInit } from '@angular/core';

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
export class ScheduleFilterComponent implements OnInit
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
                console.log("Recieving information successful");
                this.doctorShortInformationFormControl.setDoctorShortInfoList(doctorsShortInformationSubject);
            }
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
            let pickedDoctorShortInfo = <DoctorShortInformation>this.doctorShortInformationFormControl.getFormControl().value;
            console.log("Picked doctor is: " + pickedDoctorShortInfo.lastName + " " + pickedDoctorShortInfo.firstName)
            // console.log("His ID is: " + pickedDoctorShortInfo.id)
            this.appointmentRegistrationInfoService.changeDoctorName(pickedDoctorShortInfo.lastName);
            this.appointmentRegistrationInfoService.changeDoctorId(BigInt(pickedDoctorShortInfo.id));
            console.log("Picked Doctor id is: " + pickedDoctorShortInfo.id)
            this.doctorShortInfoService.setRequestedInfo(new FilterSettings(pickedDoctorShortInfo.id, startDate, endDate));
            /*for (let doctorShortInfo of this.doctorShortInformationFormControl.doctorShortInformationFiltered.value)
            {
                if (doctorShortInfo.toString() === this.doctorShortInformationFormControl.doctorShortInformationFormControl.value)
                {
                    //After this function executes appointment forms pop up. See doctor-shared-short-information service
                    this.doctorShortInfoService.setRequestedInfo(new FilterSettings(doctorShortInfo.id,
                                            startDate, endDate));
                }
            }*/
        }
        else
        {
            this.popUpMessageService.displayWarning("Фильтры содержат незаполненные поля или некорректные значения");
            //alert("Filter is invalid!");
        }
    }

    calendarDateRangeChanged(pickedDates: PickedDates)
    {
        this.pickedDates = pickedDates;
    }
}
