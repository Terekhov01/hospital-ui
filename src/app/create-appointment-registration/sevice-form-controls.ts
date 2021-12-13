import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import {Service} from "../service";

@Injectable()
export class ServiceFormControls implements OnInit
{
  public ServiceList = new BehaviorSubject<Service[]>([]);
  public ServiceFiltered = new BehaviorSubject<Service[]>([]);
  public ServiceFormControl: FormControl = new FormControl();
  private formValueSubscription: Subscription | undefined;

  ServiceFormControls()
  {}

  ngOnInit(): void
  {
    this.formValueSubscription = undefined;
  }

  private filterService(value: string): Service[]
  {
    const filterValue = value.toLowerCase();

    return this.ServiceList.value.filter(option => option.toString().toLowerCase().includes(filterValue));
  }

  setServiceList(ServiceList: BehaviorSubject<Service[]>): void
  {
    this.ServiceList = ServiceList;
    this.ServiceFormControl = new FormControl("",
      [this.ServiceValidator]);

    this.formValueSubscription = this.ServiceFormControl.valueChanges.subscribe((value) =>
    {
      this.ServiceFiltered.next(this.filterService(value));
    });

    //Following line emits valueChange event. It make autocomplete menu pop up on click (when symbols are yet to be inserted)
    this.ServiceFormControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    // CODE FOR DEBUGGING
    /*
    this.ServiceFormControl.valueChanges.subscribe((value) => console.log(value));
    this.ServiceFormControl.statusChanges.subscribe((status) =>
        {
            console.log(this.ServiceFormControl.errors);
            console.log(status);
        });
    */
  }

  getFormControl(): FormControl
  {
    return this.ServiceFormControl;
  }

  ServiceValidator(): ValidatorFn
  {
    return (formControl: AbstractControl) =>
    {
      for (let service of this.ServiceList.value)
      {
        if (formControl.value === service.toString())
        {
          return null;
        }
      }

      return { ServiceValidator: { message: "Input string is not associated with any Service!" } };
    }
  }
}
