import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ISchedulePatternShortInfo } from './apply-schedule-pattern.i-raw-data';

@Injectable()
export class PatternAutocompleteFormControl implements OnInit
{
    private patternShortInfoSourceList = new BehaviorSubject<ISchedulePatternShortInfo[]>([]);
    public patternShortInfoFiltered = new BehaviorSubject<ISchedulePatternShortInfo[]>([]);
    private patternAutocompleteFormControl: FormControl = new FormControl("", [this.patternValidator()]/*(formControl: AbstractControl) =>
    {
        for (let patternShortInfo of this.patternShortInfoSourceList.value)
        {
            if (formControl.value === patternShortInfo.name)
            {
                this.autocompleteInsertedSchedulePattern = patternShortInfo;
                return null;
            }
        }

        this.autocompleteInsertedSchedulePattern = null;
        return { doctorShortInformationValidator: { message: "Input string is not associated with any pattern!" } };
    }*/);
    private formValueSubscription: Subscription | undefined;
    private autocompleteInsertedSchedulePattern: ISchedulePatternShortInfo | null = null;

    DoctorShortInformationFormControls()
    {}

    ngOnInit(): void
    {
        this.formValueSubscription = undefined;
    }

    private filterSourcePatterns(value: string): ISchedulePatternShortInfo[]
    {
        const filterValue = value.toLowerCase();
    
        return this.patternShortInfoSourceList.value.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    setPatternList(doctorShortInformationList: BehaviorSubject<ISchedulePatternShortInfo[]>): void
    {
        this.patternShortInfoSourceList = doctorShortInformationList;

        this.formValueSubscription = this.patternAutocompleteFormControl.valueChanges.subscribe((value) => 
        {
            this.patternShortInfoFiltered.next(this.filterSourcePatterns(value));
        });

        //Following line emits valueChange event. It make autocomplete menu pop up on click (when symbols are yet to be inserted)
        this.patternAutocompleteFormControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });

        // CODE FOR DEBUGGING
        /*
        this.doctorShortInformationFormControl.valueChanges.subscribe((value) => console.log(value));
        this.doctorShortInformationFormControl.statusChanges.subscribe((status) => 
            {
                console.log(this.doctorShortInformationFormControl.errors);
                console.log(status);
            });
        */
    }

    getFormControl(): FormControl
    {
        return this.patternAutocompleteFormControl;
    }

    getAutocompleteInsertedSchedulePattern(): ISchedulePatternShortInfo | null
    {
        return this.autocompleteInsertedSchedulePattern;
    }

    patternValidator(): ValidatorFn
    {
        return (formControl: AbstractControl) =>
        {
            for (let patternShortInfo of this.patternShortInfoSourceList.value)
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