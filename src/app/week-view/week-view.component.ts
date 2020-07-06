import { Component, OnInit } from '@angular/core';
import { WeekViewService } from '../week-view.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.sass']
})
export class WeekViewComponent implements OnInit {
  constructor(private weekViewService: WeekViewService) { }

  getCurrentWeekDays(): any[] {
    const weekdays = this.weekViewService.getCurrentWeek()
      .map(weekDay => {
        return {
          day: weekDay.format('ddd'),
          date: weekDay.format('D')
        };
      });
    // this is for the extra 'blank' column in the beginning where the FAB
    // should be displayed.
    weekdays.unshift({
      day: '',
      date: ''
    });
    return weekdays;
  }

  ngOnInit(): void {
  }

}
