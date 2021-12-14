import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonUtilsService } from '../_services/common-utils.service';

import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../_services/doctor-shared-short-information.service';
import { FilterSettings } from '../schedule-filter/schedule-filter.filter-settings';
import { IDoctorScheduleAppointmentsData, DoctorScheduleAppointmentsDataDaily, ScheduleInterval } from './schedule-appointment.i-raw-data';

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

    constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService, public utilsService: CommonUtilsService) 
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
                alert("Internal error. \
                            Failed loading available appointments data to ScheduleAppointmentBlockComponent. \
                            Cannot invoke presentAppointmentDates method.")
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
                    alert("Server responce is invalid - multiple doctors' information recieved. Parsing first doctor.");
                }

                if (doctorScheduleAppointmentsSubjects.value.length === 0)
                {
                    alert("No appointments available.");
                }

                let doctorScheduleAppointments = doctorScheduleAppointmentsSubjects.value[0];

                let intervalCounter = 0;
                let curDate = this.requestedInformation.getStartDate();
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
                alert(error.error);
            },
            complete: () =>
            { 
                console.log("Recieving information successful");
            }
        });
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