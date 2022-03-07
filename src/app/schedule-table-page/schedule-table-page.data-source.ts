import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, Subscription, timeInterval } from "rxjs";
import { DoctorScheduleService } from "../_services/doctor-schedule.service";
import { DailyInformation, DoctorInfo, IDoctorSchedule } from "../schedule-transfer-data/schedule-table-page.data-transfer-objects";
import { Interval, RoundedTimeIntervalConverter, TimeRounded } from "../schedule-transfer-data/schedule-interval.data-transfer-objects";
import { PopUpMessageService } from "../_services/pop-up-message.service";

export class ScheduleTableDataSource implements DataSource<Interval[][]>//, OnDestroy
{
    private doctorsInfoSubject = new BehaviorSubject<DoctorInfo[]>(null);
    private schedulesSubject = new BehaviorSubject<Interval[][][]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private tableDataSubscription: Subscription | undefined;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private doctorScheduleService: DoctorScheduleService, private popUpMessageService: PopUpMessageService) {}
    
    /*ngOnDestroy(): void
    {
        this.unsubscribeTableData();
    }*/

    getSchedulesSubject(): BehaviorSubject<Interval[][][]>
    {
        return this.schedulesSubject;
    }

    getDoctorsInfoSubject(): BehaviorSubject<DoctorInfo[]>
    {
        return this.doctorsInfoSubject;
    }

    connect(collectionViewer: CollectionViewer): Observable<Interval[][][]>
    {
        return this.schedulesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void
    {
        this.schedulesSubject.complete();
        this.loadingSubject.complete();
        this.unsubscribeTableData();
    }

    loadDoctorSchedules(onDataRecieved: CallableFunction, startDate: Date, endDate: Date, doctorIds: number[])
    {
        this.loadingSubject.next(true);

        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate, doctorIds).subscribe(
        {
            next: (IDoctorScheduleArray: IDoctorSchedule[]) => 
            {
                let doctorsInfo: DoctorInfo[] = [];
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
                this.schedulesSubject.next(tablesData);
            }, 
            error: (error) => 
            { 
                this.popUpMessageService.displayError(error);
                //alert(error.error);
            },
            complete: () =>
            { 
                onDataRecieved();
            }
        });
    }

    clearData(): void
    {
        this.doctorsInfoSubject.next([]);
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
