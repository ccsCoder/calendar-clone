import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventProviderService } from '../event-provider.service';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.sass']
})
export class DayViewComponent implements OnInit {

  events = [];
  currentDay: string = moment().format('dddd');
  currentDate: string = moment().format('Do');
  currentMonth: string = moment().format('MMMM');

  constructor(
    private eventProviderService: EventProviderService,
  ) { }

  slots: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

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

  ngOnInit() {
    this.eventProviderService.eventsRefreshed$.subscribe((events: []) => {
      console.log('Receive Events... !', events);
      this.processEvents(events);
    });
  }

}
