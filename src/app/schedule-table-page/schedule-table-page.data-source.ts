import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
<<<<<<<< HEAD:src/app/schedule-table-page/schedule-table-page.data-source.ts
import { DoctorScheduleService } from "../_services/doctor-schedule.service";
import { IDoctorScheduleTableData } from "./schedule-table-page.i-raw-data";

export class ScheduleTableDataSource implements DataSource<IDoctorScheduleTableData>//, OnDestroy
{
    private doctorSchedulesSubject = new BehaviorSubject<IDoctorScheduleTableData[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private tableDataSubscription: Subscription | undefined;
========
import { DoctorScheduleService } from "../doctor-schedule.service";
import { IDoctorScheduleTableData } from "./schedule-table.i-raw-data";

export class ScheduleTableDataSource implements DataSource<IDoctorScheduleTableData>
{
  private doctorSchedulesSubject = new BehaviorSubject<IDoctorScheduleTableData[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private tableDataSubscription: Subscription | undefined;
>>>>>>>> origin/s02180053-Appointment:src/app/schedule-table/schedule-table.data-source.ts

  public loading$ = this.loadingSubject.asObservable();

<<<<<<<< HEAD:src/app/schedule-table-page/schedule-table-page.data-source.ts
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

    loadDoctorSchedules(onDataRecieved: CallableFunction, startDate: Date, endDate: Date)
    {
        this.loadingSubject.next(true);

        this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate).pipe(
            catchError((error) => 
            {
                console.error();
                alert("Server inacessible or data malformed!");
                return of([]);
            }),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe((doctorScheduleArray: IDoctorScheduleTableData[]) => 
        {
            this.doctorSchedulesSubject.next(doctorScheduleArray);
        }, (error) => 
        { 
            alert("Error translating data from server!");
            console.error();
         },
         () => { 
             console.log("Recieving information successful");
             onDataRecieved();
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
========
  constructor(private doctorScheduleService: DoctorScheduleService) {}

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
  }

  loadDoctorSchedules(onDataRecieved: CallableFunction, startDate: Date, endDate: Date)
  {
    this.loadingSubject.next(true);

    this.tableDataSubscription = this.doctorScheduleService.getDoctorScheduleTableObservables(startDate, endDate).pipe(
      catchError((error) =>
      {
        console.error();
        alert("Server inacessible or data malformed!");
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((doctorScheduleArray: IDoctorScheduleTableData[]) =>
      {
        this.doctorSchedulesSubject.next(doctorScheduleArray);
      }, (error) =>
      {
        alert("Error translating data from server!");
        console.error();
      },
      () => {
        console.log("Recieving information successful");
        onDataRecieved();
      });
  }

  unsubscribeTable()
  {
    if (this.tableDataSubscription === undefined)
    {
      return;
    }

    this.tableDataSubscription.unsubscribe();
  }
}
>>>>>>>> origin/s02180053-Appointment:src/app/schedule-table/schedule-table.data-source.ts
