import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { IDoctorSchedule } from '../schedule-transfer-data/schedule-table-page.data-transfer-objects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IDoctorScheduleAppointmentsData } from '../schedule-transfer-data/schedule-appointment.data-transfer-objects';
import { TimeRounded } from '../schedule-transfer-data/schedule-interval.data-transfer-objects';
import { ISchedulePatternShortInfo } from '../schedule-transfer-data/schedule-apply-pattern.data-transfer-obects';
import { TokenStorageService } from './token-storage.service';
import { ScheduleTablePattern } from '../schedule-transfer-data/schedule-prolong-page.data-transfer-objects';

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
    private schedulePatternDelete: string;
    private scheduleIntervalUpdate: string;
    private docId: string;
    private startDateTime: string;

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService)
    {
        this.tableUrl = "http://localhost:8080/schedule/table";
        this.calendarUrl = "http://localhost:8080/schedule/calendar";
        this.schedulePatternListUrl = "http://localhost:8080/schedule-pattern/list-patterns";
        this.schedulePatternViewUrl = "http://localhost:8080/schedule-pattern/view-pattern";
        this.scheduleAddPatternUrl = "http://localhost:8080/schedule-pattern/add-pattern";
        this.schedulePatternProlong = "http://localhost:8080/schedule-pattern/apply-pattern";
        this.schedulePatternDelete = "http://localhost:8080/schedule-pattern/delete";
        this.scheduleIntervalUpdate = "http://localhost:8080/schedule/markAsAssigned";
    }

    markScheduleIntervalAsAssigned(id: bigint, startDate: Date): Observable<Object> {
      let httpParams = new HttpParams();
      this.docId = id.toString();
      this.startDateTime = startDate.toISOString();
      const stateData = {
        docId: this.docId,
        startDateTime: this.startDateTime
      };
      console.log("Doctor id in schedule service: " + id)
      console.log("Doctor longId in schedule service: " + this.docId)
      console.log("Start time in schedule service: " + this.startDateTime);
      httpParams = httpParams.append("docId", this.docId);
      httpParams = httpParams.append("startDateTime", this.startDateTime);
      return this.http.put("http://localhost:8080/schedule/markAsAssigned", stateData, {responseType: 'text'});
    }

    getDoctorScheduleTableObservables(startDate: Date, endDate: Date, doctorIds: number[]): Observable<IDoctorSchedule[]>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("dateBeginRepresent", startDate.toISOString());
        httpParams = httpParams.append("dateEndRepresent", endDate.toISOString());
        httpParams = httpParams.append("doctorIds", doctorIds.toString());

        return this.http.get<IDoctorSchedule[]>(this.tableUrl, {params: httpParams});
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
        return this.http.get<ISchedulePatternShortInfo[]>(this.schedulePatternListUrl);
    }

    getSchedulePattern(patternName: string): Observable<ScheduleTablePattern>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("patternName", patternName);

        return this.http.get<ScheduleTablePattern>(this.schedulePatternViewUrl, { params: httpParams });
    }

    patchScheduleByPattern(patternName: string, dateToApply: Date, repeatCnt: number): Observable<string>
    {
        let requestBody =
        {
            patternName: patternName,
            dateToApplyStr: dateToApply.toISOString(),
            repeatCnt: repeatCnt
        };
        return this.http.patch<string>(this.schedulePatternProlong, requestBody);
    }

    deletePattern(patternName: string): Observable<string>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("patternName", patternName);

        return this.http.delete<string>(this.schedulePatternDelete, { params: httpParams });
    }
}
