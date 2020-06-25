import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventProviderService } from '../event-provider.service';
import { CalendarActionsService } from '../calendar-actions.service';
import { NavigationDirection } from 'src/config/navigation-direction';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.sass']
})
export class DayViewComponent implements OnInit {

  events = [];
  currentDateTime = moment();
  currentDay: string = null;
  currentDate: string = null;
  currentMonth: string = null;

  constructor(
    private eventProviderService: EventProviderService,
    private calenderActionsService: CalendarActionsService,
  ) {
    this.setDateVariables();
  }

  slots: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

  private setDateVariables() {
    this.currentDay = moment(this.currentDateTime).format('dddd');
    this.currentDate = moment(this.currentDateTime).format('Do');
    this.currentMonth = moment(this.currentDateTime).format('MMMM');
  }

  private convertTime(dateTimeString) {
    return moment(dateTimeString).format('HH:mm');
  }

  private processEvents(events: []) {
    this.events = events.map((event: any) => {
      event.startTime = this.convertTime(event.start.dateTime);
      event.endTime = this.convertTime(event.end.dateTime);
      event.name = event.summary;
      return event;
    });
  }

  private onDayChanged(newDate: moment.Moment) {
    this.currentDateTime = moment(newDate);
    // update the dates.
    this.setDateVariables();
  }

  ngOnInit() {
    this.eventProviderService.eventsRefreshed$.subscribe((events: []) => {
      console.log('Receive Events... !', events);
      this.processEvents(events);
    });
    // for calendar Next / Previous clicked.
    this.calenderActionsService.dayNavigationAction$.subscribe((direction: NavigationDirection) => {
      let newDate = null;
      if (direction === NavigationDirection.NEXT) {
        newDate = moment(this.currentDateTime).add(1, 'day');
      } else if (direction === NavigationDirection.PREV) {
        newDate = moment(this.currentDateTime).subtract(1, 'day');
      } else if (direction === NavigationDirection.TODAY) {
        // reset to today.
        newDate = moment();
      }
      this.onDayChanged(newDate);
    });
  }

}
