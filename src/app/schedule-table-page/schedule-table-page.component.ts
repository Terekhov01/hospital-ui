import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonUtilsService } from '../_services/common-utils.service';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { PickedDates } from '../material-date-range-picker/material-date-range-picker.component';
import { ScheduleTableDataSource } from './schedule-table-page.data-source';

class FilterSettings
{
    private startDate: Date;
    private endDate: Date;
    private pickedDoctors: number[];

    setStartDate(startDate: Date)
    {
        this.startDate = startDate;
    }

    getStartDate(): Date
    {
        return this.startDate;
    }

    setEndDate(endDate: Date)
    {
        this.endDate = endDate;
    }

    getEndDate(): Date
    {
        return this.endDate;
    }

    setDoctors(pickedDoctors: number[])
    {
        this.pickedDoctors = pickedDoctors;
    }

    getPickedDoctors(): number[]
    {
        return this.pickedDoctors;
    }

    isStateValid(): boolean
    {
        if (this.startDate != null && this.endDate != null && this.pickedDoctors.length > 0)
        {
            return true;
        }

        return false;
    }
}

@Component({
    selector: 'app-schedule-table-page-component',
    templateUrl: './schedule-table-page.component.html',
    styleUrls: ['./schedule-table-page.component.css'],
        // Need to remove view encapsulation so that the custom tooltip style defined in
        // `tooltip-custom-class-example.css` will not be scoped to this component's view.
    encapsulation: ViewEncapsulation.None
})
export class ScheduleTablePageComponent implements OnInit
{
    filterSettings = new FilterSettings();

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
        this.displayedColumns = ["lastName", "firstName", "specialization"];
        this.columnHeaderDates = [];
        this.columnHeaderDayOfWeekNames = [];
        this.dailyInformationCounter = 0;
    }

    ngOnInit(): void
    {
    }

    fillTableContents(startDate: Date, endDate: Date): void
    {
        this.columnHeaderDates = [];
        this.columnHeaderDayOfWeekNames = [];
        this.displayedColumns = ["lastName", "firstName", "specialization"];
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

    incrementDailyInformationCounter(): void
    {
        this.dailyInformationCounter++;
    }

    resetDailyInformationCounter(): void
    {
        this.dailyInformationCounter = 0;
    }

    calendarDateRangeChanged(pickedDates: PickedDates): void
    {
        this.filterSettings.setStartDate(pickedDates.getStartDate());
        this.filterSettings.setEndDate(pickedDates.getEndDate());
    }

    doctorsPickedChanged(pickedDoctors: number[]): void
    {
        this.filterSettings.setDoctors(pickedDoctors);
    }

    showSchedule(): void
    {
        if (this.filterSettings.isStateValid())
        {
            this.dataSource.loadDoctorSchedules(() => { this.fillTableContents(this.filterSettings.getStartDate(), this.filterSettings.getEndDate()); }, this.filterSettings.getStartDate(), this.filterSettings.getEndDate(), this.filterSettings.getPickedDoctors());
        }
        else
        {
            alert("Заполните фильтры. Интервал времени не может быть больше месяца.");
        }
    }
}