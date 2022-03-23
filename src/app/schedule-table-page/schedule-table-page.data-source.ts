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
    isScheduleLoading = false;
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

    loadDoctorSchedules(startDate: Date, endDate: Date, doctorIds: number[])
    {
        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate, doctorIds).subscribe(
        {
            next: (IDoctorScheduleArray: IDoctorSchedule[]) => 
            {
                let doctorSchedules: DoctorSchedule[] = [];

                for (let IDoctorSchedule of IDoctorScheduleArray)
                {
                    let doctorSchedule: DoctorSchedule = new DoctorSchedule(startDate, endDate);
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
                                maxIntervalAmountThisWeek = 1;
                            }
                        }
                    }

                    doctorSchedules.push(doctorSchedule);
                }

                this.schedulesSubject.next(doctorSchedules);
            }, 
            error: (error) => 
            { 
                this.isScheduleLoading = false;
                this.popUpMessageService.displayError(error);
            },
            complete: () =>
            { 
                this.isScheduleLoading = false;
                this.unsubscribeTableData();
            }
        });
    }

    clearData(): void
    {
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
