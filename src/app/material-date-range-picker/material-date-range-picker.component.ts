import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  @Output() pickedValue: EventEmitter<PickedDates> = new EventEmitter();

  datePickerGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private _adapter: DateAdapter<any>)
  {
    //Init date picker form
    this.datePickerGroup = this.formBuilder.group(
      {
        daterange: new FormGroup(
          {
            start: new FormControl(),
            end: new FormControl()
          })
      });
  }

  ngOnInit(): void
  {
    this._adapter.setLocale('ru');
    this.datePickerGroup.valueChanges.subscribe((dates) =>
      {
        this.pickedValue.emit(new PickedDates(this.datePickerGroup.value.daterange.start, this.datePickerGroup.value.daterange.end));
      }
    );
  }

}
