import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorScheduleService } from '../doctor-schedule.service';
import { IDoctorSchedule } from '../doctor-schedule/i-doctor-schedule';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { doctorSchedules } from '../doctor-schedule/doctor-schedule-mock';
import { ScheduleTableDataSource } from './schedule-table.data-source';

@Component({
    selector: 'app-schedule-table-component',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

    displayedColumns = ["id", "specialization", "name"];
    dataSource: ScheduleTableDataSource;

    constructor(private doctorScheduleService: DoctorScheduleService) 
    {
        //this.dataSource = doctorSchedules;
        this.dataSource = new ScheduleTableDataSource(this.doctorScheduleService);
    }

    ngOnInit(): void
    {
        this.dataSource.loadDoctorSchedules();
    }


}