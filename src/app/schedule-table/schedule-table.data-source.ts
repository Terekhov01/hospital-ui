import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DoctorScheduleService } from "../doctor-schedule.service";
import { doctorSchedules } from "../doctor-schedule/doctor-schedule-mock";
import { IDoctorSchedule } from "../doctor-schedule/i-doctor-schedule";
import { IDoctorData } from "./schedule-table.i-raw-data";

export class ScheduleTableDataSource implements DataSource<IDoctorData>
{
    private doctorSchedulesSubject = new BehaviorSubject<IDoctorData[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private tableDataSubscription: Subscription | undefined;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private doctorScheduleService: DoctorScheduleService) {}

    connect(collectionViewer: CollectionViewer): Observable<IDoctorData[]> {
        return this.doctorSchedulesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.doctorSchedulesSubject.complete();
        this.loadingSubject.complete();
    }

    loadDoctorSchedules()
    {
        this.loadingSubject.next(true);

        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleObservables().pipe(
            catchError((error) => 
            {
                console.error();
                alert("Server inacessible or data malformed!");
                return of([]);
            }),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe((doctorScheduleArray: IDoctorData[]) => 
        {
            this.doctorSchedulesSubject.next(doctorScheduleArray);
        }, (error) => 
        { 
            alert("Error translating data from server!");
            console.error();
         }, () => { console.log("Recieving information successful"); });
    }    
}