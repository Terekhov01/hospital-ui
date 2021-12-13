import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor() { }

  getDateStrEnLocale(date: Date): string
  {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
    ].join('-');
  }

  getDateStrRuLocale(date: Date): string
  {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [(dd>9 ? '' : '0') + dd,
      (mm>9 ? '' : '0') + mm,
      date.getFullYear()
    ].join('.');
  }
}
