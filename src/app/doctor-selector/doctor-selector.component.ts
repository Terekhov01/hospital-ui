import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { startWith, map, first, reduce, last } from "rxjs/operators";
import { DoctorService } from '../doctor.service';
import { SpecializationService } from '../_services/specialization.service';
import { IUserNameId, UserNameId } from './doctor-selector.i-raw-data';
import { BehaviorEventEmitter } from "../common-utility-classes/behavior-event-emitter";

@Component({
    selector: 'app-doctor-selector',
    templateUrl: './doctor-selector.component.html',
    styleUrls: ['./doctor-selector.component.css']
})  
export class MaterialMultiSelectorComponent implements OnInit
{
    specializationForm: FormGroup = this._formBuilder.group({
        specializationControl: '',
    });
    specializationFormSubscription: Subscription | null = null;

    doctorsMultiselectForm: FormGroup = this._formBuilder.group({
        doctorsMultiselectControl: '',
    });
    //doctorsMultiselectForm: FormControl = new FormControl();

    //All existing specializations and a subscription to it
    specializationGroups = new Map<string, string[]>();
    autocompleteSpecializationSubscription: Subscription | null = null;
    
    //Filtered specializations
    specializationGroupOptions: Observable<Map<string, string[]>> = of(this.specializationGroups);

    doctorsWithSpecializationSubscription: Subscription | null = null;
    doctorsWithSpecializations: UserNameId[] = [];
    doctorsSelectSubscription: Subscription | null = null;

    @Input()
    private maxPickAmount: number;

    @Output()
    pickedDoctors = new BehaviorEventEmitter<number[]>();

    constructor(private _formBuilder: FormBuilder, private specializationService: SpecializationService, private doctorService: DoctorService)
    {}

    ngOnInit()
    {
        this.doctorsMultiselectForm.get("doctorsMultiselectControl").disable();

        this.autocompleteSpecializationSubscription = this.specializationService.getSpecializationAutocompleteOptions().subscribe({
            next: (specializationAutocompleteOptions: Map<string, string[]>) =>
            {
                for (let startLetter in specializationAutocompleteOptions)
                {
                    this.specializationGroups.set(startLetter, specializationAutocompleteOptions[startLetter]);
                }
            },
            error: (error) =>
            {
                console.log(error.error);
            },
            complete: () =>
            {
                if (this.specializationFormSubscription != null && !this.specializationFormSubscription.closed)
                {
                    this.specializationFormSubscription.unsubscribe();
                }

                this.specializationFormSubscription = this.specializationForm.get('specializationControl').valueChanges.subscribe({
                    next: (value: string) =>
                    {
                        this.specializationGroupOptions = of(this._filterMap(value));
                        this.specializationGroupOptions.forEach((map: Map<string, string[]>) => {
                            if (map.has(value.charAt(0)) && map.get(value.charAt(0)).indexOf(value) != -1)
                            {
                                this.doctorsWithSpecializationSubscription = this.doctorService.getDoctorShortInfoBySpecialization(value).subscribe({
                                    next: (iUsersNamesIds: IUserNameId[]) =>
                                    {
                                        this.doctorsWithSpecializations = [];
                                        for (let iUserNameId of iUsersNamesIds)
                                        {
                                            let tmp = new UserNameId(iUserNameId);
                                            this.doctorsWithSpecializations.push(tmp);
                                        }
                                    },
                                    error: (error) =>
                                    {
                                        console.log(error.error);
                                    },
                                    complete: () =>
                                    {
                                        if (this.doctorsWithSpecializations.length !== 0)
                                        {
                                            this.doctorsMultiselectForm.get("doctorsMultiselectControl").enable();
                                        }
                                        else
                                        {
                                            this.doctorsMultiselectForm.get("doctorsMultiselectControl").setValue('');
                                            this.doctorsMultiselectForm.get("doctorsMultiselectControl").disable();
                                        }
                                    }
                                });
                            }
                            else
                            {
                                this.doctorsMultiselectForm.get("doctorsMultiselectControl").setValue('');
                                this.doctorsMultiselectForm.get("doctorsMultiselectControl").disable();
                            }
                        });
                    }
                });
            }
        });

        this.doctorsSelectSubscription = this.doctorsMultiselectForm.get('doctorsMultiselectControl').valueChanges.subscribe({
            next: (value) =>
            {
                if (value.length === 0)
                {
                    return;
                }
                else if (value.length > this.maxPickAmount)
                {
                    alert("Можно выбрать только " + this.maxPickAmount + " или меньше докторов одновременно");
                    this.doctorsMultiselectForm.get('doctorsMultiselectControl').setValue(this.pickedDoctors.value);
                }
                else
                {
                    this.pickedDoctors.emit(value.map((pickedDoctor: UserNameId) => pickedDoctor.id));
                }
            },
            error: (error) =>
            {
                console.log(error.error);
            }
        });
    }

    public clearPickedValues(): void
    {
        this.specializationForm.get('specializationControl').setValue('');
        this.pickedDoctors.emit([]);
    }

    private _filterMap(value: string): Map<string, string[]>
    {
        let filtredSpecializations = new Map<string, string[]>();
        this.specializationGroups.forEach((specializationNames, startLetter) =>
        {
            for (let specializationName of specializationNames)
            {
                if (specializationName.includes(value))
                {
                    if (filtredSpecializations.has(startLetter))
                    {
                        filtredSpecializations.get(startLetter).push(specializationName);
                    }
                    else
                    {
                        filtredSpecializations.set(startLetter, [specializationName]);
                    }
                }
            }
        })

        return filtredSpecializations;
    }
}