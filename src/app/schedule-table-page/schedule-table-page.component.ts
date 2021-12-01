import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonUtilsService } from '../common-utils.service';
import { DoctorScheduleService } from '../doctor-schedule.service';
import { ScheduleTableDataSource } from './schedule-table-page.data-source';

@Component({
  selector: 'app-schedule-table-page-component',
  templateUrl: './schedule-table-page.component.html',
  styleUrls: ['./schedule-table-page.component.css']
})
export class ScheduleTablePageComponent implements OnInit {

  displayedColumns: string[];
  columnHeaderDates: string[];
  columnHeaderDayOfWeekNames: string[];
  dataSource: ScheduleTableDataSource;
  userLocale: string;
  dailyInformationCounter: number

  getUserLocale() : string
  {
    if (navigator.languages != undefined)
      return navigator.languages[0];
    return navigator.language;
  }

  getDayName(date: Date, locale: string): string
  {
    let str = date.toLocaleDateString(locale, { weekday: 'long' });
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  constructor(private doctorScheduleService: DoctorScheduleService, private utilsService: CommonUtilsService)
  {
    this.dataSource = new ScheduleTableDataSource(this.doctorScheduleService);
    this.userLocale = this.getUserLocale();
    this.displayedColumns = ["specialization", "name"];
    this.columnHeaderDates = [];
    this.columnHeaderDayOfWeekNames = [];
    this.dailyInformationCounter = 0;
  }

  ngOnInit(): void
  {
    //TODO - refactor this to obtain data from user
    let startDate = new Date("01.01.2000");
    let endDate = new Date("01.20.2000");

    this.dataSource.loadDoctorSchedules(() => { this.fillTableContents(startDate, endDate); }, startDate, endDate);
  }

  fillTableContents(startDate: Date, endDate: Date): void
  {
    let counter = 0;

    let curDate = new Date(startDate);
    while (curDate <= endDate)
    {
      this.columnHeaderDates.push(this.utilsService.getDateStrEnLocale(curDate));
      this.columnHeaderDayOfWeekNames.push(this.getDayName(curDate, this.userLocale));
      let newDate = curDate.setDate(curDate.getDate() + 1);
      curDate = new Date(newDate);
      this.displayedColumns.push("day" + counter);
      counter++;
    }
  }

  a(): boolean
  {
    console.log("Goose");
    return true;
  }

  incrementDailyInformationCounter(): void
  {
    this.dailyInformationCounter++;
  }

  resetDailyInformationCounter(): void
  {
    this.dailyInformationCounter = 0;
  }
}
