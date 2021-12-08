import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterSettings } from '../schedule-filter/schedule-filter.filter-settings';
import { DoctorShortInformation, IDoctorShortInformation } from '../schedule-filter/schedule-filter.i-raw-data';

@Injectable({
  providedIn: 'root'
})
export class DoctorSharedShortInformationService implements OnInit
{
    private calendarUrl: string;
    private doctorShortInfoUrl: string;

    //These variables are used to allow interacion between filter and schedule appointment controllers
    //Initializing with NaN to prevent possible errors of accessing uninitialized instance
    private requestedInfo = new BehaviorSubject<FilterSettings>(new FilterSettings(NaN, new Date(), new Date()));
    sharedRequestedInformationAsObservable = this.requestedInfo.asObservable();

    constructor(private http: HttpClient) 
    {
        this.calendarUrl = "http://localhost:8080/schedule/calendar/";
        this.doctorShortInfoUrl = "http://localhost:8080/schedule/getDoctorNames";
    }

    ngOnInit(): void
    {}

    getDoctorShortInformationObservables(id: number[] | undefined): Observable<IDoctorShortInformation[]>
    {
        let httpParams = new HttpParams();
        if (id != undefined)
        {
           httpParams = httpParams.append("doctorIds", id.join(","));
        }
        
        return this.http.get<IDoctorShortInformation[]>(this.doctorShortInfoUrl, {params: httpParams});
    }

    setRequestedInfo(message: FilterSettings): void
    {
        this.requestedInfo.next(message);
    }
}
