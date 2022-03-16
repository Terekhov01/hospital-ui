import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor() { }

    getDateStrRuLocale(date: Date): string
    {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            date.getFullYear()
            ].join('.');
    }

    static getMondayBefore(date: Date): Date
    {
        // Start from monday of the first week - the most recent monday before/or startDate
        let retVal = new Date(date);
        retVal.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1));
         return retVal;
    }

    static getSundayAfter(date: Date): Date
    {
        // End with sunday of the last week - the most recent sunday after/or endDate
        let retVal = new Date(date);
        retVal.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1) + 7);
        return retVal;
    }

    static getDayMondayZero(date: Date): number
    {
      return date.getDay() + (date.getDay() == 0 ? 6 : -1);
    }
}
