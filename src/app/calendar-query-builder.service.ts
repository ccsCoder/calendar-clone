import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ViewTypes } from 'src/config/view-type';

@Injectable({
  providedIn: 'root'
})
export class CalendarQueryBuilderService {

  viewType: ViewTypes;
  direction: string;
  DIR_PREV = 'PREV';
  DIR_NEXT = 'NEXT';

  constructor() { }

  setViewType(viewType: ViewTypes) {
    this.viewType = viewType;
    return this;
  }

  setDirection(direction: string) {
    this.direction = direction;
    return this;
  }

  // yeah this is ugly. I don't have time.
  build() {
    let maxLimit = null;
    if (this.viewType === ViewTypes.DAY) {
      if (this.direction === this.DIR_PREV) {
        maxLimit = moment().subtract(1, 'day').toISOString();
      } else if (this.direction === this.DIR_NEXT) {
        maxLimit = moment().add(1, 'day').toISOString();
      }
    } else if (this.viewType === ViewTypes.MONTH) {
      if (this.direction === this.DIR_PREV) {
        maxLimit = moment().subtract(1, 'month').toISOString();
      } else if (this.direction === this.DIR_NEXT) {
        maxLimit = moment().add(1, 'month').toISOString();
      }
    } else if (this.viewType === ViewTypes.WEEK) {
      if (this.direction === this.DIR_PREV) {
        maxLimit = moment().subtract(1, 'week').toISOString();
      } else if (this.direction === this.DIR_NEXT) {
        maxLimit = moment().add(1, 'week').toISOString();
      }
    } else if (this.viewType === ViewTypes.YEAR) {
      if (this.direction === this.DIR_PREV) {
        maxLimit = moment().subtract(1, 'year').toISOString();
      } else if (this.direction === this.DIR_NEXT) {
        maxLimit = moment().add(1, 'year').toISOString();
      }
    } else if (this.viewType === ViewTypes.SCHEDULE) {
      console.log('Not supported yet...');
    }

    return {
      timeMax: maxLimit,
    };
  }

}
