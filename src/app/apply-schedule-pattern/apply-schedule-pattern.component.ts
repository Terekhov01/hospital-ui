import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SchedulePatternDataSource } from '../schedule-prolong-page/schedule-prolong-page.data-source';
import { ScheduleDayPattern, ScheduleTablePattern, TimeRounded } from '../schedule-prolong-page/schedule-prolong-page.i-raw-data';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { ISchedulePatternShortInfo } from './apply-schedule-pattern.i-raw-data';
import { PatternDayRangeSelectionStrategy } from './apply-schedule-pattern.selection-stratedy';
import { PatternAutocompleteFormControl } from './schedule-pattern-name-autocomplete.form-control';

@Component({
  selector: 'app-apply-schedule-pattern',
  templateUrl: './apply-schedule-pattern.component.html',
  styleUrls: ['./apply-schedule-pattern.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: PatternDayRangeSelectionStrategy,
    },
  ]
})
export class ApplySchedulePatternComponent implements OnInit
{

    public patternAutocompleteFormControl = new PatternAutocompleteFormControl();

    public buttonFormControl = new FormControl();

    tableData: SchedulePatternDataSource = new SchedulePatternDataSource(this.formBuilder);

    public patternRangePicker = this.formBuilder.group(
    {
        rangeStartDate: new FormControl(),
        rangeEndDate: new FormControl()
    },
    {
        validators: [this.dateRangePickerValidator()],
        updateOn: 'change'
    });

    private patternSubscription: Subscription | null = null;

    constructor(private scheduleService: DoctorScheduleService, private formBuilder: FormBuilder, private _adapter: DateAdapter<any>)
    {
        this._adapter.setLocale('ru');
    }

    ngOnInit(): void
    {
        let patternShortInformationsSubject = new BehaviorSubject<ISchedulePatternShortInfo[]>([]);

        //Retrieve available patterns from server
        this.patternSubscription = this.scheduleService.getPatternNames().subscribe({
        next: (patternShortInfoList) => 
        {
            patternShortInformationsSubject.next(patternShortInfoList);
        },
        error: (error) => 
        { 
            alert(error.error);
        },
        complete: () => 
        { 
            console.log("Recieving information successful");
            this.patternAutocompleteFormControl.setPatternList(patternShortInformationsSubject);
        }
        });

        this.patternAutocompleteFormControl.getFormControl().valueChanges.subscribe(
            {
                next: (value) =>
                {
                    if (value == "")
                    {
                        return;
                    }

                    let patternObservable = this.scheduleService.getSchedulePattern(value);
                    patternObservable.subscribe(
                    {
                        next: (schedulePatternRepresentation: ScheduleTablePattern) =>
                        {
                            let scheduleDailyPatterns: ScheduleDayPattern[] = [];

                            for (let dayPatternRepresentation of schedulePatternRepresentation.scheduleDailyPatterns)
                            {                                
                                let scheduleDayPattern = new ScheduleDayPattern(dayPatternRepresentation.dayNumber, [])
                                for (let timeRoundedRepresentation of dayPatternRepresentation.timesRounded)
                                {
                                    let timeRounded = new TimeRounded();
                                    timeRounded.setTime(timeRoundedRepresentation.hour, timeRoundedRepresentation.minute);
                                    scheduleDayPattern.timesRounded.push(timeRounded);
                                }
                                scheduleDailyPatterns.push(scheduleDayPattern);
                            }

                            let schedulePattern: ScheduleTablePattern = new ScheduleTablePattern(schedulePatternRepresentation.patternName,
                                                                           schedulePatternRepresentation.daysLength,
                                                                           scheduleDailyPatterns);
                            
                            this.tableData.displayPattern(schedulePattern);
                        },
                        error: (error) =>
                        {
                            alert(error.error);
                        },
                        complete: () =>
                        {}
                    });
                },
                error: (error) =>
                {
                    alert("Internal error. Schedule pattern name is changed, but event cannot be processed");
                },
                complete: () =>
                {

                },
            }
        );
        
        //Set date range picker parameters depending on chosen pattern and repeat count
        this.patternAutocompleteFormControl.getFormControl().valueChanges.subscribe((value) =>
        {
            if (this.patternAutocompleteFormControl.getFormControl().valid)
            {
                if (this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern() == null)
                {
                    this.patternRangePicker.disable();
                    throw "Internal logic error!\n Name pattern validator returned true but no information is present about it!";
                }

                PatternDayRangeSelectionStrategy.setPatternLength(this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern()!.daysLength);

                this.patternRangePicker.enable();
            }
            else
            {
                this.patternRangePicker.get("rangeStartDate")!.setValue("");
                this.patternRangePicker.get("rangeEndDate")!.setValue("");
                this.patternRangePicker.disable();
            }
        });

        //Set submit button disabled or enabled depending on previous fields status
        this.patternRangePicker.valueChanges.subscribe((value) =>
        {
            if (this.patternRangePicker.enabled && this.patternRangePicker.valid)
            {
                this.buttonFormControl.enable();
            }
            else
            {
                this.buttonFormControl.disable();
            }
        });
    }

    onProlongButtonClicked(): void
    {
        let patternName = this.patternAutocompleteFormControl.getFormControl().value;
        let dateToApply: Date = this.patternRangePicker.get("rangeStartDate")!.value;

        let response = this.scheduleService.patchScheduleByPattern(patternName, dateToApply);

        response.subscribe(
        {
            next: (value) =>
            {
                alert("Расписание изменено");
            },
            error: (error) =>
            {
                alert(error.error);
            }
        });
    }

    dateRangePickerValidator(): ValidatorFn
    {
        return (dateRangePicker: AbstractControl) =>
        {
            let startDate = dateRangePicker.get("rangeStartDate");
            let endDate = dateRangePicker.get("rangeEndDate");

            if (startDate == null || startDate.value == "")
            {
                return { dateRangePickerValidator: { message: "Start date range contains no information" } };
            }

            if (endDate == null || endDate.value == "")
            {
                return { dateRangePickerValidator: { message: "End date range contains no information. This most probably is an internal application error!" } };
            }

            return null;
        }
    }
}
