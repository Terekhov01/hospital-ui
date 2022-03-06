import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { SchedulePatternDataSource } from './schedule-create-pattern.data-source';
import { ScheduleDayPattern, ScheduleTablePattern } from '../schedule-transfer-data/schedule-prolong-page.data-transfer-objects';
import { Interval, TimeRounded } from '../schedule-transfer-data/schedule-interval.data-transfer-objects';
import { Subject } from 'rxjs';
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-create-pattern',
  templateUrl: './schedule-create-pattern.component.html',
  styleUrls: ['./schedule-create-pattern.component.css']
})
export class ScheduleCreatePatternComponent implements OnInit {
    isHintShown: boolean = false;
    // Used to update pattern list in autocomplete below
    patternSavedEvent: Subject<void> = new Subject<void>();

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

    newPatternName = new FormControl("", [Validators.required, this.notEmptyValidator]);

    tableData: SchedulePatternDataSource = new SchedulePatternDataSource(this.formBuilder);

    constructor(private formBuilder: FormBuilder, private scheduleService: DoctorScheduleService, private popUpMessageService: PopUpMessageService)
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

        if (this.newPatternName.invalid)
        {
            this.popUpMessageService.displayWarning("У шаблона должно быть осмысленное имя. Оно должно что-то содержать. Имя только из пробелов не допускается");
            return;
        }

        if (tableData.length === 0)
        {
            this.popUpMessageService.displayWarning("Шаблон не может быть пустым");
            //alert("Шаблон не может быть пустым!");
            return;
        }
        
        if (tableData == undefined)
        {
            return;
        }

        let scheduleTablePattern = new ScheduleTablePattern(this.newPatternName.value, 
                                                            this.tableData.getColumnAmount(),
                                                            tableData);

        let response = this.scheduleService.postDoctorSchedulePattern(scheduleTablePattern);

        let subscription = response.subscribe({
            next: (responseStr) => 
            {
                this.patternSavedEvent.next();
                this.popUpMessageService.displayConfirmation("Шаблон сохранен");
                //alert("Сохранено");
            },
            error: (error) =>
            {
                this.popUpMessageService.displayError(error);
                //alert(error.error);
            },
            complete: () =>
            {
                subscription.unsubscribe();
            }
        });
    }

    getDataFromTable(): ScheduleDayPattern[] | undefined
    {
        if (this.tableData.getTableDataSubject().value.invalid)
        {
            this.popUpMessageService.displayWarning(this.getFormGroupValidationErrors(this.tableData.getTableDataSubject().value));
            //alert(this.getFormGroupValidationErrors(this.tableData.getTableDataSubject().value));
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

    public notEmptyValidator(control: FormControl)
    {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}
