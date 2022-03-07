import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonUtilsService } from '../_services/common-utils.service';

import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../_services/doctor-shared-short-information.service';
import { FilterSettings } from '../schedule-filter/schedule-filter.filter-settings';
import { IDoctorScheduleAppointmentsData, DoctorScheduleAppointmentsDataDaily, ScheduleInterval } from '../schedule-transfer-data/schedule-appointment.data-transfer-objects';
import { AppointmentRegistrationInfoService } from "../appointment-registration-info.service";
import { Router } from "@angular/router";
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-schedule-appointment-block',
  templateUrl: './schedule-appointment-block.component.html',
  styleUrls: ['./schedule-appointment-block.component.css']
})
export class ScheduleAppointmentBlockComponent implements OnInit
{
    //Initializing with NaN to prevent possible errors of accessing uninitialized instance
    public requestedInformation: FilterSettings = new FilterSettings(NaN, new Date(), new Date());
    private doctorShortInformationSubscription: Subscription | undefined;
    private doctorAppointmentDataSubscription: Subscription | undefined;

    public doctorScheduleDailyAppointmentsArray: DoctorScheduleAppointmentsDataDaily[] = [];

    constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService, public utilsService: CommonUtilsService,
                private appointmentRegistrationInfoService: AppointmentRegistrationInfoService, private router: Router,
                private popUpMessageService: PopUpMessageService)
    {}

    ngOnInit(): void
    {
        this.doctorShortInformationSubscription = this.doctorShortInfoService.sharedRequestedInformationAsObservable.subscribe(
        {
            next: sharedInformation =>
            {
                this.requestedInformation = sharedInformation;
                this.presentAppointmentDates();
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert("Internal error. \
                //            Failed loading available appointments data to ScheduleAppointmentBlockComponent. \
                //            Cannot invoke presentAppointmentDates method.")
            }
        });
    }

    presentAppointmentDates(): void
    {
        if (isNaN(this.requestedInformation.getId()))
        {
            return;
        }

        let appointmentDataObservables = this.doctorScheduleService.getDoctorScheduleAppointmentDataObservables(
                                    this.requestedInformation.getId(),
                                    this.requestedInformation.getStartDate(),
                                    this.requestedInformation.getEndDate(),
                                    true);

        this.doctorAppointmentDataSubscription = appointmentDataObservables/*.pipe(
            catchError((error) =>
            {
                console.error();
                alert("Server inacessible or data malformed! Cannot load available appointment dates.");
                return of([]);
            })
        ).*/.subscribe(
        {
            next: (doctorAppointmentsData) =>
            {
                let doctorScheduleAppointmentsSubjects = new BehaviorSubject<IDoctorScheduleAppointmentsData[]>([]);
                doctorScheduleAppointmentsSubjects.next(doctorAppointmentsData);

                //Here we assume that there is only one doctor contained in responce from server. Function on server is capable
                //of sending msny doctors' info, but we want to present data nicely so we create a request and recieve data of
                //the only doctor. Next if statement checks if server responds with relative information.
                if (doctorScheduleAppointmentsSubjects.value.length > 1)
                {
                    this.popUpMessageService.displayWarning("Ответ сервера неверен: он содержит информацию о нескольких докторах. Вся информация не может быть обработана.\
                    Показывается только информация о первом докторе");
                    //alert("Server responce is invalid - multiple doctors' information recieved. Parsing first doctor.");
                }

                if (doctorScheduleAppointmentsSubjects.value.length === 0)
                {
                    this.popUpMessageService.displayWarning("Нет доступного для записи времени");
                    //alert("Нет доступного для записи времени");
                }

                let doctorScheduleAppointments = doctorScheduleAppointmentsSubjects.value[0];

                let intervalCounter = 0;
                let curDate = new Date(this.requestedInformation.getStartDate());
                let intervalArray: ScheduleInterval[] = [];
                let curInterval: ScheduleInterval;

                while (curDate <= this.requestedInformation.getEndDate() && intervalCounter < doctorScheduleAppointments.intervalCollection.length)
                {
                    curInterval = new ScheduleInterval(doctorScheduleAppointments.intervalCollection[intervalCounter])
                    if (datesHaveSameYearMonthAndDate(curDate, curInterval.getIntervalStartTime()))
                    {
                        intervalArray.push(curInterval);
                        intervalCounter++;
                    }
                    else
                    {
                        if (intervalArray.length !== 0)
                        {
                            let doctorScheduleDailyAppointments = new DoctorScheduleAppointmentsDataDaily(doctorScheduleAppointments, new Date(curDate));
                            doctorScheduleDailyAppointments.setIntervalCollection(intervalArray);

                            this.doctorScheduleDailyAppointmentsArray.push(doctorScheduleDailyAppointments);
                            intervalArray = [];
                        }

                        curDate.setDate(curDate.getDate() + 1);
                    }
                }

                if (intervalArray.length !== 0)
                {
                    let doctorScheduleDailyAppointments = new DoctorScheduleAppointmentsDataDaily(doctorScheduleAppointments, new Date(curDate));
                    doctorScheduleDailyAppointments.setIntervalCollection(intervalArray);
                    this.doctorScheduleDailyAppointmentsArray.push(doctorScheduleDailyAppointments);
                }
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert(error.error);
            },
            complete: () =>
            {
                console.log("Recieving information successful");
            }
        });
    }

    selectDateTime(dateTime: Date) {
      console.log("In select date time method");
      console.log("Date time is: ")
      this.appointmentRegistrationInfoService.changeDate(dateTime);
      this.router.navigate(['/create-appointment-registration'])
    }

    /*debugger(value: any, value2: any): boolean
    {
        return true;
    }*/
}

function datesHaveSameYearMonthAndDate(first: Date, second: Date): boolean
{
    if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate())
    {
        return true;
    }
    return false;
}
