import {Component, Injectable, OnInit} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()
export class PatternDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D>
{
    constructor(private _dateAdapter: DateAdapter<D>)
    {}

    static patternLength = 0;

    static setPatternLength(patternLength: number): void
    {
        PatternDayRangeSelectionStrategy.patternLength = patternLength;
    }

    selectionFinished(date: D | null): DateRange<D>
    {
        return this.createPatternDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D>
    {
        return this.createPatternDayRange(activeDate);
    }

    private createPatternDayRange(date: D | null): DateRange<D>
    {
        if (date)
        {
            const start = date;
            const end = this._dateAdapter.addCalendarDays(date, PatternDayRangeSelectionStrategy.patternLength);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}