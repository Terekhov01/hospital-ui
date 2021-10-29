import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { doctorSchedules } from './doctor-schedule/doctor-schedule-mock';
import { IDoctorData } from './schedule-table/schedule-table.i-raw-data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DoctorScheduleService
{
    private serverUrl: string;
    //private debugUrl: string;
    private data: string;

    constructor(private http: HttpClient) 
    { 
        this.serverUrl = "http://localhost:8080/schedule";
        //this.debugUrl = "http://localhost:8080/test";
        this.data = "";
    }

    getDoctorScheduleObservables(): Observable<IDoctorData[]>
    {
        /*this.http.get('http://localhost:8080/test', {responseType: 'text'})
        .subscribe(data => 
            {
                this.data = data;
                console.log(data);
            }, (error) => {
                console.log(error);
            }, () => {console.log("End")});*/

        return this.http.get<IDoctorData[]>(this.serverUrl);
    }
}
