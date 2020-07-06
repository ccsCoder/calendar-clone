import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeekViewService {

  constructor() { }

  getCurrentWeek(): Moment[] {
    const currentDate = moment();

    const weekStart = currentDate.clone().startOf('isoWeek');
    const days: Moment[] = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days'));
    }
    console.log(days);
    return days;
  }
}
