import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { SchedulePatternDataSource } from './schedule-create-pattern.data-source';
import { ScheduleDayPattern, ScheduleTablePattern } from '../schedule-transfer-data/schedule-prolong-page.data-transfer-objects';
import { Interval, TimeRounded } from '../schedule-transfer-data/schedule-interval.data-transfer-objects';

@Component({
  selector: 'app-create-pattern',
  templateUrl: './schedule-create-pattern.component.html',
  styleUrls: ['./schedule-create-pattern.component.css']
})
export class ScheduleCreatePatternComponent implements OnInit {

    primaryTheme: NgxMaterialTimepickerTheme = {
        container:
        {
            bodyBackgroundColor: '#ffffff',
            buttonColor: '#3f51b5'
        },
        dial:
        {
            dialBackgroundColor: '#3f51b5',
            dialEditableActiveColor: '#3f51b5',
            dialActiveColor: '#ffffff',
            dialInactiveColor: '#ffffff'
        },
        clockFace:
        {
            clockFaceBackgroundColor: '#ebebeb',
            clockHandColor: '#3f51b5',
            clockFaceTimeInactiveColor: '#3f51b5',
            clockFaceInnerTimeInactiveColor: '#f44336'
        }
    };

    newPatternName = "";

    tableData: SchedulePatternDataSource = new SchedulePatternDataSource(this.formBuilder);

    constructor(private formBuilder: FormBuilder, private scheduleService: DoctorScheduleService)
    {}
    
    ngOnInit(): void
    {}

    getErrorStr(validationError: ValidationErrors | null): string
    {
        let errorString = "";
        if (validationError == null)
        {
            return errorString;
        }

        Object.keys(validationError).forEach((errorType) =>
        {
            Object.keys(validationError[errorType]).forEach((message: any) =>
            {
                errorString += validationError[errorType][message];
                errorString += "\n";
            })
        });
        return errorString;
    }

    getFormControlValidationErrors(formControl: FormControl): string
    {
        return this.getErrorStr(formControl.errors);
    }

    // That is a bad practice but there is no common interface that allows me to merge the two methods methods below:
    // getFormArrayValidationErrors() and getFormGroupValidationErrors()
    getFormArrayValidationErrors(formArray: FormArray): string
    {
        let errorString = this.getErrorStr(formArray.errors);

        Object.keys(formArray.controls).forEach(key => {
            // Get errors of every form control
            let child = formArray.get(key);

            if (child instanceof FormControl)
            {
                errorString += this.getFormControlValidationErrors(child);
            }
            else if (child instanceof FormGroup)
            {
                errorString += this.getFormGroupValidationErrors(child);
            }
            else if (child instanceof FormArray)
            {
                errorString += this.getFormArrayValidationErrors(child);
            }
            else
            {
                throw "AbstractControl is not instance of any of these: FormControl, FormGroup or FormArray";
            }
        });

        return errorString;
    }

    getFormGroupValidationErrors(formGroup: FormGroup): string
    {
        let errorString = this.getErrorStr(formGroup.errors);

        Object.keys(formGroup.controls).forEach(key => {
            // Get errors of every form control
            let child = formGroup.get(key);

            if (child instanceof FormControl)
            {
                errorString += this.getFormControlValidationErrors(child);
            }
            else if (child instanceof FormGroup)
            {
                errorString += this.getFormGroupValidationErrors(child);
            }
            else if (child instanceof FormArray)
            {
                errorString += this.getFormArrayValidationErrors(child);
            }
            else
            {
                throw "AbstractControl is not instance of any of these: FormControl, FormGroup or FormArray";
            }
        });

        return errorString;
    }

    onSubmitClicked(): void
    {
        let tableData = this.getDataFromTable();

        if (tableData.length === 0)
        {
            alert("Шаблон не может быть пустым!");
            return;
        }
        
        if (tableData == undefined)
        {
            return;
        }

        let scheduleTablePattern = new ScheduleTablePattern(this.newPatternName, 
                                                            this.tableData.getColumnAmount(),
                                                            tableData);

        let response = this.scheduleService.postDoctorSchedulePattern(scheduleTablePattern);

        response.subscribe({
            next: (responseStr) => 
            {
                alert("Сохранено");
            },
            error: (error) =>
            {
                alert (error.error);
            }
        });
    }

    getDataFromTable(): ScheduleDayPattern[] | undefined
    {
        if (this.tableData.getTableDataSubject().value.invalid)
        {
            alert(this.getFormGroupValidationErrors(this.tableData.getTableDataSubject().value));
            //alert("Some of non-empty input fields do not represent valid time interval!");
            return undefined;
        }

        let tableForms = <FormGroup>this.tableData.getTableDataSubject().value;
        let tableRows = <FormArray>tableForms.get("rows");
        let retVal: ScheduleDayPattern[] = [];
        
        for (let rowNum = 0; rowNum < tableRows.length; rowNum++)
        {
            let row = <FormGroup> tableRows.get(String(rowNum));
            let cellArray = <FormArray> row.get("cells");

            //Initialize with empty intervals
            if (retVal.length === 0)
            {
                for (let i = 0; i < cellArray.length; i++)
                {
                    retVal.push(new ScheduleDayPattern(i, []));
                }
            }

            for (let cellNum = 0; cellNum < cellArray.length; cellNum++)
            {
                let cell = <FormGroup> cellArray.get(String(cellNum));

                let startTimeForm = cell.get("startTime");
                let endTimeForm = cell.get("endTime");

                let startTimeStr = startTimeForm!.value;
                let endTimeStr = endTimeForm!.value;

                if (startTimeStr == null && endTimeStr == null)
                {
                    continue;
                }

                let startTimeRounded = new TimeRounded(), endTimeRounded = new TimeRounded();

                startTimeRounded.setTimeByString(startTimeStr);
                endTimeRounded.setTimeByString(endTimeStr);

                let cellInterval = new Interval(startTimeRounded, endTimeRounded);

                retVal[cellNum].addIntervals([cellInterval]);
            }
        }

        return retVal;
    }

    debugger(value: any): boolean
    {
        console.log(value);

        return true;
    }
}
