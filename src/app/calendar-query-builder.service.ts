import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ViewTypes } from 'src/config/view-type';
import { NavigationDirection } from 'src/config/navigation-direction';

@Injectable({
  providedIn: 'root'
})
export class CalendarQueryBuilderService {

  viewType: ViewTypes;
  direction: NavigationDirection;
  currentDate: moment.Moment;

  constructor() { }

  setViewType(viewType: ViewTypes) {
    this.viewType = viewType;
    return this;
  }

  setDirection(direction: NavigationDirection) {
    this.direction = direction;
    return this;
  }

  setCurrentDate(date: moment.Moment) {
    this.currentDate = date;
    return this;
  }

  // yeah this is ugly. I don't have time.
  // Will refactor if I get a couple of days.
  build() {
    if (!this.currentDate) {
      throw new Error('No current date specified!');
    }
    // else continue.
    let maxLimit = null;
    if (this.viewType === ViewTypes.DAY) {
      if (this.direction === NavigationDirection.PREV) {
        // maxLimit = moment(this.currentDate).subtract(1, 'day');
        maxLimit = this.currentDate;
      } else if (this.direction === NavigationDirection.NEXT) {
        // maxLimit = moment(this.currentDate).add(1, 'day');
        maxLimit = this.currentDate;
      }
    } else if (this.viewType === ViewTypes.MONTH) {
      if (this.direction === NavigationDirection.PREV) {
        maxLimit = moment(this.currentDate).subtract(1, 'month');
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = moment(this.currentDate).add(1, 'month');
      }
    } else if (this.viewType === ViewTypes.WEEK) {
      if (this.direction === NavigationDirection.PREV) {
        maxLimit = moment(this.currentDate).subtract(1, 'week');
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = moment(this.currentDate).add(1, 'week');
      }
    } else if (this.viewType === ViewTypes.YEAR) {
      if (this.direction === NavigationDirection.PREV) {
        maxLimit = moment(this.currentDate).subtract(1, 'year');
      } else if (this.direction === NavigationDirection.NEXT) {
        maxLimit = moment(this.currentDate).add(1, 'year');
      }
    } else if (this.viewType === ViewTypes.SCHEDULE) {
      console.log('Not supported yet...');
    }

    return {
      timeMax: maxLimit.set({hour: 23, minute: 59, second: 59}).toISOString(),
      timeMin: this.currentDate.set({hour: 0, minute: 0, second: 0}).toISOString(),
    };
  }

}
