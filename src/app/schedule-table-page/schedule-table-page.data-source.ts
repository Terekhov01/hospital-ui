import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DoctorScheduleService } from "../_services/doctor-schedule.service";
import { IDoctorScheduleTableData } from "./schedule-table-page.i-raw-data";

export class ScheduleTableDataSource implements DataSource<IDoctorScheduleTableData>//, OnDestroy
{
    private doctorSchedulesSubject = new BehaviorSubject<IDoctorScheduleTableData[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private tableDataSubscription: Subscription | undefined;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private doctorScheduleService: DoctorScheduleService) {}
    
    /*ngOnDestroy(): void
    {
        this.unsubscribeTableData();
    }*/

    getDoctorSchedulesSubject(): BehaviorSubject<IDoctorScheduleTableData[]>
    {
        return this.doctorSchedulesSubject;
    }

    connect(collectionViewer: CollectionViewer): Observable<IDoctorScheduleTableData[]> {
        return this.doctorSchedulesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.doctorSchedulesSubject.complete();
        this.loadingSubject.complete();
        this.unsubscribeTableData();
    }

    loadDoctorSchedules(onDataRecieved: CallableFunction, startDate: Date, endDate: Date, doctorIds: number[])
    {
        this.loadingSubject.next(true);

        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate, doctorIds).subscribe(
        {
            next: (doctorScheduleArray: IDoctorScheduleTableData[]) => 
            {
                this.doctorSchedulesSubject.next(doctorScheduleArray);
            }, 
            error: (error) => 
            { 
                alert(error.error);
            },
            complete: () =>
            { 
                onDataRecieved();
            }
        });
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
