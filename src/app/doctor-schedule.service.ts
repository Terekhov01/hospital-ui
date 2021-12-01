import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
//import { doctorSchedules } from './doctor-schedule/doctor-schedule-mock';
import { IDoctorShortInformation } from './schedule-filter/schedule-filter.i-raw-data';
import { IDoctorScheduleTableData } from './schedule-table-page/schedule-table-page.i-raw-data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IDoctorScheduleAppointmentsData } from './schedule-appointment-block/schedule-appointment.i-raw-data';
import { ScheduleDayPattern, TimeRounded } from './schedule-prolong-page/schedule-prolong-page.i-raw-data';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService
{
  private tableUrl: string;
  private calendarUrl: string;
  private scheduleAddPatternUrl: string;

  constructor(private http: HttpClient)
  {
    this.tableUrl = "http://localhost:8080/schedule/table/";
    this.calendarUrl = "http://localhost:8080/schedule/calendar/";
    this.scheduleAddPatternUrl = "http://localhost:8080/schedule/add-pattern/";
  }

  getDoctorScheduleTableObservables(startDate: Date, endDate: Date): Observable<IDoctorScheduleTableData[]>
  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("dateBeginRepresent", startDate.toISOString());
    httpParams = httpParams.append("dateEndRepresent", endDate.toISOString());

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

  postDoctorSchedulePattern(pattern: ScheduleDayPattern[]): Observable<string>
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
    console.log(patternString);
    httpParams = httpParams.append("schedulePattern", patternString);

    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `my_token`);

    return this.http.post<string>(this.scheduleAddPatternUrl, { headers: headers, params: httpParams });
  }
}
