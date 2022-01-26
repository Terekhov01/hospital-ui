import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DoctorShortInformation } from '../schedule-transfer-data/schedule-filter.data-transfer-objects';

@Injectable()
export class DoctorShortInformationFormControls implements OnInit
{
    public doctorShortInformationList = new BehaviorSubject<DoctorShortInformation[]>([]);
    public doctorShortInformationFiltered = new BehaviorSubject<DoctorShortInformation[]>([]);
    public doctorShortInformationFormControl: FormControl = new FormControl();
    private formValueSubscription: Subscription | undefined;

    DoctorShortInformationFormControls()
    {}

    ngOnInit(): void
    {
        this.formValueSubscription = undefined;
    }

    private filterDoctorShortInformation(value: string): DoctorShortInformation[]
    {
        const filterValue = value.toLowerCase();
    
        return this.doctorShortInformationList.value.filter(option => option.toString().toLowerCase().includes(filterValue));
    }

    setDoctorShortInfoList(doctorShortInformationList: BehaviorSubject<DoctorShortInformation[]>): void
    {
        this.doctorShortInformationList = doctorShortInformationList;
        this.doctorShortInformationFormControl = new FormControl("", 
                        [this.doctorShortInfoValidator]);

        this.formValueSubscription = this.doctorShortInformationFormControl.valueChanges.subscribe(
        {
            next: (value: DoctorShortInformation) => 
            {
                this.doctorShortInformationFiltered.next(this.filterDoctorShortInformation(value.toString()));
            },
            error: (error) =>
            {
                alert("Internal error: " + error.error);
            }
        });

        //Following line emits valueChange event. It make autocomplete menu pop up on click (when symbols are yet to be inserted)
        this.doctorShortInformationFormControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });

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
        return this.doctorShortInformationFormControl;
    }

    doctorShortInfoValidator(): ValidatorFn
    {
        return (formControl: AbstractControl) =>
        {
            for (let doctorInformation of this.doctorShortInformationList.value)
            {
                if (formControl.value === doctorInformation.toString())
                {
                    return null;
                }
            }

            return { doctorShortInformationValidator: { message: "Input string is not associated with any doctor!" } };
        }
    }
}