import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchedulePatternShortInfo } from '../schedule-transfer-data/schedule-apply-pattern.data-transfer-obects';

@Injectable()
export class PatternAutocompleteFormControl implements OnInit
{
    private patternShortInfoSourceList: SchedulePatternShortInfo[] = [];
    public patternShortInfoFiltered: SchedulePatternShortInfo[] = [];
    private patternAutocompleteFormControl: FormControl = new FormControl("", [this.patternValidator()]);
    private formValueSubscription: Subscription | undefined;
    private autocompleteInsertedSchedulePattern: SchedulePatternShortInfo | null = null;

    DoctorShortInformationFormControls()
    {}

    ngOnInit(): void
    {
        this.formValueSubscription = undefined;
    }

    private filterSourcePatterns(value: string): SchedulePatternShortInfo[]
    {
        const filterValue = value.toLowerCase();
    
        return this.patternShortInfoSourceList.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    setPatternList(doctorShortInformationList: SchedulePatternShortInfo[]): void
    {
        this.patternShortInfoSourceList = doctorShortInformationList;

        if (this.formValueSubscription !== undefined)
        {
            this.formValueSubscription.unsubscribe();
        }

        this.formValueSubscription = this.patternAutocompleteFormControl.valueChanges.subscribe((value) => 
        {
            this.patternShortInfoFiltered = this.filterSourcePatterns(value);
        });

        //Following line emits valueChange event. It make autocomplete menu pop up on click (when symbols are yet to be inserted)
        this.patternAutocompleteFormControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }

    getFormControl(): FormControl
    {
        return this.patternAutocompleteFormControl;
    }

    getAutocompleteInsertedSchedulePattern(): SchedulePatternShortInfo | null
    {
        return this.autocompleteInsertedSchedulePattern;
    }

    patternValidator(): ValidatorFn
    {
        return (formControl: AbstractControl) =>
        {
            for (let patternShortInfo of this.patternShortInfoSourceList)
            {
                if (formControl.value === patternShortInfo.name)
                {
                    this.autocompleteInsertedSchedulePattern = patternShortInfo;
                    return null;
                }
            }

            this.autocompleteInsertedSchedulePattern = null;
            return { doctorShortInformationValidator: { message: "Input string is not associated with any pattern!" } };
        }
    }
}