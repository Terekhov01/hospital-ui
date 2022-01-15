import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

export class PickedDates
{
    private startDate: Date | undefined;
    private endDate: Date | undefined;

    constructor(startDate: Date | undefined, endDate: Date | undefined)
    {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getStartDate(): Date | undefined
    {
        return this.startDate;
    }

    getEndDate(): Date | undefined
    {
        return this.endDate;
    }
}

@Component({
  selector: 'app-material-date-range-picker',
  templateUrl: './material-date-range-picker.component.html',
  styleUrls: ['./material-date-range-picker.component.css']
})
export class MaterialDateRangePickerComponent implements OnInit
{
    public minDate = new Date(2000, 0, 1);
    public maxDate = new Date(2199, 11, 31);
    
    @Output()
    pickedDateRange: EventEmitter<PickedDates> = new EventEmitter();

    datePickerGroup: FormGroup;

    @Input()
    private rangeMaxLengthInDays: number;

    constructor(private formBuilder: FormBuilder, private _adapter: DateAdapter<any>)
    { 
        //Init date picker form
        this.datePickerGroup = this.formBuilder.group(
            {
                daterange: new FormGroup(
                    {
                        start: new FormControl(),
                        end: new FormControl()
                    },
                    {
                        validators: [this.rangeLengthValidator()],
                        updateOn: 'change'
                    })
            });
    }

    ngOnInit(): void
    {
        this._adapter.setLocale('ru');
        this.datePickerGroup.valueChanges.subscribe((dates) => 
        {
            if (this.datePickerGroup.get('daterange').get('start').value != null && this.datePickerGroup.get('daterange').get('end').value != null && this.datePickerGroup.valid)
            {
                this.pickedDateRange.emit(new PickedDates(this.datePickerGroup.value.daterange.start, this.datePickerGroup.value.daterange.end));
            }
            else
            {
                this.pickedDateRange.emit(new PickedDates(null, null));
            }
        });
    }

    rangeLengthValidator(): ValidatorFn
    {
        return (dateRangeGroup: AbstractControl) =>
        {
            let startDate = dateRangeGroup.get("start");
            let endDate = dateRangeGroup.get("end");

            const diffMills = endDate.value - startDate.value;
            const diffDays = Math.ceil(diffMills / (1000 * 60 * 60 * 24)); 
            if (diffDays >= this.rangeMaxLengthInDays)
            {
                return { rengeLengthValidator: { message: "Date range is too big! Please shrink it to interval of" + this.rangeMaxLengthInDays + " days or less" } };
            }

            return null;
        }
    }

}
