import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
//import { doctorSchedules } from './doctor-schedule/doctor-schedule-mock';
import { IDoctorShortInformation } from './schedule-filter/schedule-filter.i-raw-data';
import { IDoctorScheduleTableData } from './schedule-table/schedule-table.i-raw-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IDoctorScheduleAppointmentsData } from './schedule-appointment-block/schedule-appointment.i-raw-data';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService
{
  private tableUrl: string;
  private calendarUrl: string;

  constructor(private http: HttpClient)
  {
    this.tableUrl = "http://localhost:8080/schedule/table/";
    this.calendarUrl = "http://localhost:8080/schedule/calendar/";
  }

  getDoctorScheduleTableObservables(startDate: Date, endDate: Date): Observable<IDoctorScheduleTableData[]>
  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("dateBeginRepresent", startDate.toISOString());
    httpParams = httpParams.append("dateEndRepresent", endDate.toISOString());

    return this.http.get<IDoctorScheduleTableData[]>(this.tableUrl, {params: httpParams});
  }

  /*getDoctorScheduleCalendarObservables(): Observable<IDoctorScheduleCalendatrData[]>
  {
      return this.http.get<IDoctorScheduleCalendatrData[]>(this.calendarUrl);
  }*/

  getDoctorScheduleAppointmentDataObservables(id: number, startDate: Date, endDate: Date, isShowingAllIntervals: boolean): Observable<IDoctorScheduleAppointmentsData[]>
  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("doctorIds", id.toString());
    httpParams = httpParams.append("startDate", startDate.toISOString());
    httpParams = httpParams.append("endDate", endDate.toISOString());
    httpParams = httpParams.append("getFreeTimeOnly", isShowingAllIntervals);

    return this.http.get<IDoctorScheduleAppointmentsData[]>(this.calendarUrl, {params: httpParams});
  }
}
