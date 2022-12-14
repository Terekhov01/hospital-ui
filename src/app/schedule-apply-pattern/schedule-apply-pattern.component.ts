import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SchedulePatternDataSource } from '../schedule-create-pattern/schedule-create-pattern.data-source';
import { ScheduleDayPattern, ScheduleTablePattern } from '../schedule-transfer-data/schedule-prolong-page.data-transfer-objects';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';
import { ISchedulePatternShortInfo, SchedulePatternShortInfo } from '../schedule-transfer-data/schedule-apply-pattern.data-transfer-obects';
import { PatternDayRangeSelectionStrategy } from './schedule-apply-pattern.selection-stratedy';
import { PatternAutocompleteFormControl } from './schedule-pattern-name-autocomplete.form-control';
import { TimeRounded } from '../schedule-transfer-data/schedule-interval.data-transfer-objects';
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
  selector: 'app-schedule-apply-pattern',
  templateUrl: './schedule-apply-pattern.component.html',
  styleUrls: ['./schedule-apply-pattern.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: PatternDayRangeSelectionStrategy,
    },
  ]
})
export class ScheduleApplyPatternComponent implements OnInit
{
    isHintShown = false;
    isScheduleChanging = false;

    public patternAutocompleteFormControl = new PatternAutocompleteFormControl();

    public scheduleApplyRepeatFormControl = new FormControl("1", { validators: this.patternRepeatInputValidator() });
    
    public deleteButtonFormControl = new FormControl();
    
    public changeButtonFormControl = new FormControl();

    tableData: SchedulePatternDataSource = new SchedulePatternDataSource(this.formBuilder);

    @Input()
    private patternSavedEvent: Observable<void>;

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

    constructor(private scheduleService: DoctorScheduleService, private formBuilder: FormBuilder, private _adapter: DateAdapter<any>,
        private popUpMessageService: PopUpMessageService)
    {
        this._adapter.setLocale('ru');
    }

    ngOnInit(): void
    {
        this.deleteButtonFormControl.disable();
        this.changeButtonFormControl.disable();
        this.updatePatternListFromServer();

        let subscription = this.patternSavedEvent.subscribe({
            next: () =>
            {
                this.updatePatternListFromServer();
            },
            complete: () =>
            {
                subscription.unsubscribe();
            }
        });

        this.patternAutocompleteFormControl.getFormControl().valueChanges.subscribe(
            {
                next: (value: string) =>
                {
                    this.tableData = new SchedulePatternDataSource(this.formBuilder);
                    this.patternRangePicker.get("rangeStartDate")!.setValue("");
                    this.patternRangePicker.get("rangeEndDate")!.setValue("");
                    this.deleteButtonFormControl.disable();
                    this.patternRangePicker.disable();

                    if (this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern() == null)
                    {
                        return;
                    }

                    if (this.patternAutocompleteFormControl.getFormControl().valid)
                    {        
                        this.deleteButtonFormControl.enable();
                        
                        if (this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern()!.daysLength < 1)
                        {
                            this.popUpMessageService.displayWarning("???????????? ?????????????????????? - ?????? ?????????? ?????????? 1 ??????");
                            return;
                        }
        
                        if (this.scheduleApplyRepeatFormControl.valid)
                        {
                            PatternDayRangeSelectionStrategy.setPatternLength(this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern()!.daysLength * this.scheduleApplyRepeatFormControl.value - 1);
                            this.patternRangePicker.enable();
                        }
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
                            this.tableData = new SchedulePatternDataSource(this.formBuilder);
                            this.popUpMessageService.displayError(error);
                        },
                        complete: () =>
                        {}
                    });
                },
                error: (error) =>
                {
                    this.popUpMessageService.displayError(error, "???????????????????? ????????????. ?????? ?????????????? ???????????????????? ????????????????, ???? ?????????????? ???? ?????????? ???????? ????????????????????");
                },
                complete: () =>
                {},
            }
        );
        
        this.scheduleApplyRepeatFormControl.valueChanges.subscribe(
            {
                next: (value) =>
                {
                    if (this.scheduleApplyRepeatFormControl.valid)
                    {
                        if (this.patternAutocompleteFormControl.getFormControl().valid)
                        {
                            PatternDayRangeSelectionStrategy.setPatternLength(this.patternAutocompleteFormControl.getAutocompleteInsertedSchedulePattern()!.daysLength * this.scheduleApplyRepeatFormControl.value - 1);
                        }
                    }
                    else
                    {
                        if (this.scheduleApplyRepeatFormControl.value !== null)
                        {
                            let aggerateErrorStr = "???????? ?????????? ???????????????????? ???????????????????? ??????????????:\n";
                            Object.keys(this.scheduleApplyRepeatFormControl).forEach(key =>
                            {
                                const controlErrors: ValidationErrors = this.scheduleApplyRepeatFormControl.get(key).errors;
                                if (controlErrors != null)
                                {
                                    Object.keys(controlErrors).forEach(keyError => {
                                        aggerateErrorStr.concat('????????????: ', keyError, '.\t????????????????: ', controlErrors[keyError], '\n');
                                    });
                                }
                            });
                            
                            this.popUpMessageService.displayWarning(aggerateErrorStr);
                        }
                    }
                }
            }
        );

        //Set submit button disabled or enabled depending on previous fields status
        this.patternRangePicker.valueChanges.subscribe((value) =>
        {
            if (this.patternRangePicker.enabled && this.patternRangePicker.valid)
            {
                this.changeButtonFormControl.enable();
            }
            else
            {
                this.changeButtonFormControl.disable();
            }
        });
    }

    updatePatternListFromServer(): void
    {
        let patternShortInfosList: ISchedulePatternShortInfo[] = [];
        //Retrieve available patterns from server
        this.patternSubscription = this.scheduleService.getPatternNames().subscribe({
            next: (patternShortInfoList) => 
            {
                for (let shortInfo of patternShortInfoList)
                {
                    patternShortInfosList.push(new SchedulePatternShortInfo(shortInfo));
                }
            },
            error: (error) => 
            { 
                this.popUpMessageService.displayError(error);
            },
            complete: () => 
            { 
                this.patternAutocompleteFormControl.setPatternList(patternShortInfosList);
                this.patternSubscription.unsubscribe();
            }
            });
    }

    onProlongButtonClicked(): void
    {
        if (this.isScheduleChanging)
        {
            return;
        }

        this.isScheduleChanging = true;
        if (this.scheduleApplyRepeatFormControl.invalid)
        {
            return;
        }

        let repeatCnt = parseInt(this.scheduleApplyRepeatFormControl.value);
        let patternName = this.patternAutocompleteFormControl.getFormControl().value;
        let dateToApply: Date = this.patternRangePicker.get("rangeStartDate")!.value;

        let response = this.scheduleService.patchScheduleByPattern(patternName, dateToApply, repeatCnt);

        let subscription = response.subscribe(
        {
            next: (value) =>
            {
                this.popUpMessageService.displayConfirmation("???????????????????? ????????????????");
            },
            error: (error) =>
            {
                this.isScheduleChanging = false;
                this.popUpMessageService.displayError(error);
            },
            complete: () =>
            {
                this.isScheduleChanging = false;
                subscription.unsubscribe();
            }
        });
    }

    onDeleteButtonClicked()
    {
        let patternName = this.patternAutocompleteFormControl.getFormControl().value;
        this.deleteButtonFormControl.disable();

        let response = this.scheduleService.deletePattern(patternName);
        let subscription = response.subscribe(
            {
                next: (value) =>
                {
                    this.updatePatternListFromServer();
                    this.popUpMessageService.displayConfirmation("?????????????? ??????????????");
                },
                error: (error) =>
                {
                    this.popUpMessageService.displayError(error);
                    this.updatePatternListFromServer();
                },
                complete: () =>
                {
                    subscription.unsubscribe();
                }
            }
        );
    }

    patternRepeatInputValidator(): ValidatorFn
    {
        return (validationField: AbstractControl) =>
        {
            let repeatCnt = Number(validationField.value);

            if (isNaN(repeatCnt) || repeatCnt < 1 || repeatCnt > 30 || !Number.isInteger(repeatCnt))
            {
                return { integerValidator: { message: "?????????????????? ???????????????? ???????????????????? ?????????????? ??????????????????????. ?????? ???????????? ???????? ?????????? ???? 1 ???? 30" } };
            }

            return null;
        }
    }

    dateRangePickerValidator(): ValidatorFn
    {
        return (dateRangePicker: AbstractControl) =>
        {
            let startDate = dateRangePicker.get("rangeStartDate");
            let endDate = dateRangePicker.get("rangeEndDate");

            if (startDate == null || startDate.value == "")
            {
                return { dateRangePickerValidator: { message: "???? ???????????? ???????? ???????????? ???????????????????? ??????????????" } };
            }

            if (endDate == null || endDate.value == "")
            {
                return { dateRangePickerValidator: { message: "???? ???????????? ???????? ?????????? ???????????????????? ??????????????" } };
            }

            return null;
        }
    }
}
