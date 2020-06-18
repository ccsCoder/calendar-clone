import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {

  constructor() { }

  fetchEvents() {
    return [
      {
        id: 1,
        name: 'Meeting with Sangatha',
        attendees: 'Gajodhar, Sangatha',
        startTime: '11:00',
        endTime: '12:15'
      },
      {
        id: 2,
        name: 'Buy the milk',
        attendees: 'Gajodhar, Sangatha',
        startTime: '01:00',
        endTime: '02:00'
      }
    ];
  }
}
