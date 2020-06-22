import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventProviderService } from '../event-provider.service';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.sass']
})
export class DayViewComponent implements OnInit {
  constructor(private eventService: EventProviderService) { }

  currentDay: string = moment().format('dddd');
  currentDate: string = moment().format('Do');
  currentMonth: string = moment().format('MMMM');

  events = null;

  slots: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

  private setEventsData = data => {
    console.log(data);
    // separate out the profile data and event data.

    // filter out data for today.

    // pass them as props to downstream.

  }

  ngOnInit = () => {
    // this.eventService.fetchUpcomingEvents().subscribe(data => console.log(data));
  }

}
