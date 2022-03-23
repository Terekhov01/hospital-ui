import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, Subscription, timeInterval } from "rxjs";
import { DoctorScheduleService } from "../_services/doctor-schedule.service";
import { DailyInformation, DoctorInfo, DoctorSchedule, IDoctorSchedule, WeeklyInformation, IDailyInformation } from "../schedule-transfer-data/schedule-table-page.data-transfer-objects";
import { Interval, RoundedTimeIntervalConverter, TimeRounded } from "../schedule-transfer-data/schedule-interval.data-transfer-objects";
import { PopUpMessageService } from "../_services/pop-up-message.service";
import { CustomDateAdapter } from "../common-utility-classes/custom-date-adapter";
import { CommonUtilsService } from "../_services/common-utils.service";

export class ScheduleTablesDataSource implements DataSource<DoctorSchedule>
{
    private schedulesSubject = new BehaviorSubject<DoctorSchedule[]>([]);
    private tableDataSubscription: Subscription | undefined;

    constructor(private doctorScheduleService: DoctorScheduleService, private popUpMessageService: PopUpMessageService) {}

    getSchedulesSubject(): BehaviorSubject<DoctorSchedule[]>
    {
        return this.schedulesSubject;
    }

    connect(collectionViewer: CollectionViewer): Observable<DoctorSchedule[]>
    {
        return this.schedulesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void
    {
        this.schedulesSubject.complete();
    }

    loadDoctorSchedules(onDataRecieved: CallableFunction, startDate: Date, endDate: Date, doctorIds: number[])
    {

        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate, doctorIds).subscribe(
        {
            next: (IDoctorScheduleArray: IDoctorSchedule[]) => 
            {
                let doctorSchedules: DoctorSchedule[] = [];

                for (let IDoctorSchedule of IDoctorScheduleArray)
                {
                    let doctorSchedule: DoctorSchedule = new DoctorSchedule();
                    //let maxIntervalAmount = 1;
                    doctorSchedule.doctorInfo.id = IDoctorSchedule.id;
                    doctorSchedule.doctorInfo.firstName = IDoctorSchedule.firstName;
                    doctorSchedule.doctorInfo.lastName = IDoctorSchedule.lastName;
                    doctorSchedule.doctorInfo.middleName = IDoctorSchedule.middleName;

                    for (let specializationStr of IDoctorSchedule.specializationNames)
                    {
                        doctorSchedule.doctorInfo.specializationNames.push(specializationStr);
                    }
                    
                    let dailyInformationArray: DailyInformation[] = [];

                    for (let IDailyInformation of IDoctorSchedule.dailyInformation)
                    {
                        let dateParts: string[] = IDailyInformation.date.split("-");
                        let dailyInformation = new DailyInformation(new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])));
                        dailyInformation.timeIntervals = [];
                        let timesRounded: TimeRounded[] = [];

                        for (let ITimeInterval of IDailyInformation.timeIntervals)
                        {
                            let hour = parseInt(ITimeInterval.substring(0, 2));
                            let minute = parseInt(ITimeInterval.substring(3));
                            let timeRounded = new TimeRounded();
                            timeRounded.setTime(hour, minute);
                            timesRounded.push(timeRounded)
                        }
                        dailyInformation.timeIntervals = RoundedTimeIntervalConverter.toIntervals(timesRounded);
                        
                        /*if (dailyInformation.timeIntervals.length > maxIntervalAmount)
                        {
                            maxIntervalAmount = dailyInformation.timeIntervals.length;
                        }*/
                        
                        dailyInformationArray.push(dailyInformation);
                    }

                    // Start from monday of the first week - the most recent monday before/or startDate
                    let firstMonday = CommonUtilsService.getMondayBefore(startDate);

                    // End with sunday of the last week - the most recent sunday after/or endDate
                    let lastSunday = CommonUtilsService.getSundayAfter(endDate);

                    let dailyInformationCounter = 0;
                    let weeklyInformation: WeeklyInformation = null;
                    // This number represents how many rows of table are required to present information
                    let maxIntervalAmountThisWeek = 1;

                    for (let curDate = firstMonday; curDate <= lastSunday; curDate.setDate(curDate.getDate() + 1))
                    {
                        if (CommonUtilsService.getDayMondayZero(curDate) == 0)
                        {
                            for (let dailyInformationCounterCpy = dailyInformationCounter; dailyInformationCounterCpy < dailyInformationArray.length && dailyInformationArray[dailyInformationCounterCpy].date < CommonUtilsService.getSundayAfter(curDate); dailyInformationCounterCpy++)
                            {
                                if (dailyInformationArray[dailyInformationCounterCpy].timeIntervals.length > maxIntervalAmountThisWeek)
                                {
                                    maxIntervalAmountThisWeek = dailyInformationArray[dailyInformationCounterCpy].timeIntervals.length;
                                }
                            }

                            weeklyInformation = new WeeklyInformation(CommonUtilsService.getMondayBefore(curDate), maxIntervalAmountThisWeek);
                        }

                        if (dailyInformationCounter < dailyInformationArray.length && 
                            curDate.getTime() === dailyInformationArray[dailyInformationCounter].date.getTime())
                        {
                            for (let rowCounter = 0; rowCounter < maxIntervalAmountThisWeek; rowCounter++)
                            {
                                if (rowCounter < dailyInformationArray[dailyInformationCounter].timeIntervals.length)
                                {
                                    weeklyInformation.dailyInformation[CommonUtilsService.getDayMondayZero(curDate)].timeIntervals[rowCounter] = 
                                                                                    dailyInformationArray[dailyInformationCounter].timeIntervals[rowCounter];
                                }
                            }
                            dailyInformationCounter++;
                        }

                        if (CommonUtilsService.getDayMondayZero(curDate) == 6)
                        {
                            if (weeklyInformation != null)
                            {
                                doctorSchedule.weeklyInformation.push(weeklyInformation);
                            }
                        }
                    }


                //     for (let rowCounter = 0; rowCounter < maxIntervalAmount; rowCounter++)
                //     {
                //         // Start from monday of the first week - the most recent monday before startDate
                //         let curDate = new Date(startDate);
                //         curDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() == 0 ? -6 : 1));
                        
                //         let weeklyInformation = new WeeklyInformation();

                //         // Fill daily information for the first week in case start date is not monday.
                //         // Doing so starting cells of the first week table will have valid cell values (null = no information present)
                //         for (; curDate < startDate; curDate.setDate(curDate.getDate() + 1))
                //         {
                //             weeklyInformation.dailyInformation.push(new DailyInformation(curDate));
                //         }
                        
                //         let dailyInformationCounter = 0;
                //         for (; curDate <= endDate; curDate.setDate(curDate.getDate() + 1))
                //         {
                //             let dayOfWeek = curDate.getDay() + (curDate.getDay() == 0 ? 6 : -1);
                //             let curDayInformation = new DailyInformation(curDate);

                //             if (dailyInformationCounter < dailyInformationArray.length 
                //                 && rowCounter <= dailyInformationArray[dailyInformationCounter].timeIntervals.length 
                //                 && curDate.getTime() === dailyInformationArray[dailyInformationCounter].date.getTime())
                //             {
                //                 weeklyInformation.dailyInformation.push(curDayInformation);
                //                 dailyInformationCounter++;
                //             }
                //             else
                //             {
                //                 weeklyInformation.dailyInformation.push(curDayInformation);
                //             }

                //             if (dayOfWeek == 6)
                //             {
                //                 doctorSchedule.weeklyInformation.push(weeklyInformation);
                //                 weeklyInformation = new WeeklyInformation();
                //             }
                //         }

                //         if (weeklyInformation.dailyInformation.length != 0)
                //         {
                //             let lastWeekSunday = new Date(endDate);
                //             lastWeekSunday.setDate(endDate.getDate() - endDate.getDay() + (endDate.getDay() == 0 ? -6 : 1) + 7);
                //             // Fill daily information for the last week in case end date is not sunday.
                //             // Doing so final cells of the last week table will have valid cell values (null = no information present)
                //             for (; curDate < lastWeekSunday; curDate.setDate(curDate.getDate() + 1))
                //             {
                //                 weeklyInformation.dailyInformation.push(new DailyInformation(curDate));
                //             }

                //             doctorSchedule.weeklyInformation.push(weeklyInformation);
                //         }

                //         /*let curDate = new Date(startDate);

                //         let weeklyInformation = new WeeklyInformation(new Date(curDate));
                //         let dailyInformationCounter = 0;
                        
                //         for (; curDate <= endDate; curDate.setDate(curDate.getDate() + 1))
                //         {
                //             let dayOfWeek = curDate.getDay();

                //             if (dailyInformationCounter < dailyInformationArray.length 
                //                 && rowCounter <= dailyInformationArray[dailyInformationCounter].timeIntervals.length 
                //                 && curDate.getTime() === dailyInformationArray[dailyInformationCounter].date.getTime())
                //             {
                //                 curDayInformation.timeIntervals.push(dailyInformationArray[dailyInformationCounter].timeIntervals[rowCounter]);
                //                 weeklyInformation.dailyInformation.push(curDayInformation);
                //                 dailyInformationCounter++;
                //             }
                //             else
                //             {
                //                 weeklyInformation.dailyInformation.push(curDayInformation);
                //             }

                //             if (dayOfWeek == 0)
                //             {
                //                 doctorSchedule.weeklyInformation.push(weeklyInformation);
                //                 weeklyInformation = new WeeklyInformation();
                //             }
                //         }

                //         if (weeklyInformation.dailyInformation.length != 0)
                //         {
                //             doctorSchedule.weeklyInformation.push(weeklyInformation);
                //         }*/
                //     }

                    doctorSchedules.push(doctorSchedule);
                }

                this.schedulesSubject.next(doctorSchedules);
                
                //===================================
                
                /*let doctorsInfo: DoctorInfo[] = [];
                let tablesData: Interval[][][] = [];

                for (let IDoctorSchedule of IDoctorScheduleArray)
                {
                    let maxIntervalAmount = 1;
                    let doctorInfo = new DoctorInfo();
                    doctorInfo.id = IDoctorSchedule.id;
                    doctorInfo.firstName = IDoctorSchedule.firstName;
                    doctorInfo.lastName = IDoctorSchedule.lastName;
                    doctorInfo.middleName = IDoctorSchedule.middleName;

                    doctorInfo.specializationNames = [];

                    for (let specializationStr of IDoctorSchedule.specializationNames)
                    {
                        doctorInfo.specializationNames.push(specializationStr);
                    }

                    doctorsInfo.push(doctorInfo);
                    

                    let dailyInformationArray: DailyInformation[] = [];

                    for (let IDailyInformation of IDoctorSchedule.dailyInformation)
                    {
                        let dailyInformation = new DailyInformation();
                        let dateParts: string[] = IDailyInformation.date.split("-");
                        dailyInformation.date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
                        dailyInformation.timeIntervals = [];
                        let timesRounded: TimeRounded[] = [];

                        for (let ITimeInterval of IDailyInformation.timeIntervals)
                        {
                            let hour = parseInt(ITimeInterval.substring(0, 2));
                            let minute = parseInt(ITimeInterval.substring(3));
                            let timeRounded = new TimeRounded();
                            timeRounded.setTime(hour, minute);
                            timesRounded.push(timeRounded)
                        }
                        dailyInformation.timeIntervals = RoundedTimeIntervalConverter.toIntervals(timesRounded);
                        
                        if (dailyInformation.timeIntervals.length > maxIntervalAmount)
                        {
                            maxIntervalAmount = dailyInformation.timeIntervals.length;
                        }
                        
                        dailyInformationArray.push(dailyInformation);
                    }
                    
                    let tableData: Interval[][] = [];

                    for (let rowCounter = 0; rowCounter < maxIntervalAmount; rowCounter++)
                    {
                        tableData.push([]);

                        let dailyInformationCounter = 0;
                        for (let curDate = new Date(startDate); curDate <= endDate; curDate.setDate(curDate.getDate() + 1))
                        {
                            if (dailyInformationCounter < dailyInformationArray.length 
                                && rowCounter <= dailyInformationArray[dailyInformationCounter].timeIntervals.length 
                                && curDate.getTime() === dailyInformationArray[dailyInformationCounter].date.getTime())
                            {
                                tableData[rowCounter].push(dailyInformationArray[dailyInformationCounter].timeIntervals[rowCounter]);
                                dailyInformationCounter++;
                            }
                            else
                            {
                                tableData[rowCounter].push(null);
                            }
                        }
                    }

                    tablesData.push(tableData);
                }

                this.doctorsInfoSubject.next(doctorsInfo);
                this.schedulesSubject.next(tablesData);*/
            }, 
            error: (error) => 
            { 
                this.popUpMessageService.displayError(error);
            },
            complete: () =>
            { 
                this.unsubscribeTableData();
                onDataRecieved();
            }
        });
    }

    clearData(): void
    {
        //this.doctorsInfoSubject.next([]);
        this.schedulesSubject.next([]);
    }

    unsubscribeTableData()
    {
        if (this.tableDataSubscription === undefined)
        {
            return;
        }

        this.tableDataSubscription.unsubscribe();
    }
}
