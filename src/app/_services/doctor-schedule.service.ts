import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { IDoctorScheduleTableData } from '../schedule-table-page/schedule-table-page.i-raw-data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IDoctorScheduleAppointmentsData } from '../schedule-appointment-block/schedule-appointment.i-raw-data';
import { ScheduleTablePattern, TimeRounded } from '../schedule-prolong-page/schedule-prolong-page.i-raw-data';
import { ISchedulePatternShortInfo } from '../schedule-apply-pattern/apply-schedule-pattern.i-raw-data';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorScheduleService
{
    private tableUrl: string;
    private calendarUrl: string;
    private scheduleAddPatternUrl: string;
    private schedulePatternListUrl: string;
    private schedulePatternViewUrl: string;
    private schedulePatternProlong: string;

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) 
    { 
        this.tableUrl = "http://localhost:8080/schedule/table";
        this.calendarUrl = "http://localhost:8080/schedule/calendar";
        this.schedulePatternListUrl = "http://localhost:8080/schedule-pattern/list-patterns";
        this.schedulePatternViewUrl = "http://localhost:8080/schedule-pattern/view-pattern";
        this.scheduleAddPatternUrl = "http://localhost:8080/schedule-pattern/add-pattern";
        this.schedulePatternProlong = "http://localhost:8080/schedule-pattern/apply-pattern";
    }

    getDoctorScheduleTableObservables(startDate: Date, endDate: Date, doctorIds: number[]): Observable<IDoctorScheduleTableData[]>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("dateBeginRepresent", startDate.toISOString());
        httpParams = httpParams.append("dateEndRepresent", endDate.toISOString());
        httpParams = httpParams.append("doctorIds", doctorIds.toString());

        return this.http.get<IDoctorScheduleTableData[]>(this.tableUrl, {params: httpParams});
    }

    getDoctorScheduleAppointmentDataObservables(id: number, startDate: Date, endDate: Date, isShowingAllIntervals: boolean): Observable<IDoctorScheduleAppointmentsData[]>
    {
        let httpParams = new HttpParams();

        httpParams = httpParams.append("doctorIds", id.toString());
        httpParams = httpParams.append("startDate", startDate.toISOString());
        httpParams = httpParams.append("endDate", endDate.toISOString());
        httpParams = httpParams.append("getFreeTimeOnly", isShowingAllIntervals);

        return this.http.get<IDoctorScheduleAppointmentsData[]>(this.calendarUrl, {params: httpParams});
    }

    postDoctorSchedulePattern(pattern: ScheduleTablePattern): Observable<string>
    {
        let httpParams = new HttpParams();
        let patternString = JSON.stringify(pattern, (key, value) => 
        {
            if (value instanceof TimeRounded)
            {
                return (<TimeRounded>value).toString();
            }
            return value;
        });
        httpParams = httpParams.append("schedulePattern", patternString);

        return this.http.post<string>(this.scheduleAddPatternUrl, { params: httpParams });
    }

    getPatternNames(): Observable<ISchedulePatternShortInfo[]>
    {
        let httpHeaders = new HttpHeaders();
        httpHeaders.append("Authorization", this.tokenStorage.getToken());

        return this.http.get<ISchedulePatternShortInfo[]>(this.schedulePatternListUrl);
    }

    getSchedulePattern(patternName: string): Observable<ScheduleTablePattern>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("patternName", patternName);

        /*let httpHeaders = new HttpHeaders();
        httpHeaders.append("Authorization", this.tokenStorage.getToken());*/

        return this.http.get<ScheduleTablePattern>(this.schedulePatternViewUrl, { params: httpParams });
    }

    patchScheduleByPattern(patternName: string, dateToApply: Date): Observable<string>
    {
        let requestBody =
        {
            patternName: patternName,
            dateToApplyStr: dateToApply.toISOString()
        };
        return this.http.patch<string>(this.schedulePatternProlong, requestBody);
    }
}
