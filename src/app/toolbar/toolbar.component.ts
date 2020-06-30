import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarActionsService } from '../calendar-actions.service';
import { NavigationDirection } from 'src/config/navigation-direction';
import { ViewSwitcherService } from '../view-switcher.service';
import { ViewTypes } from 'src/config/view-type';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  today: string = moment().format('dddd, DD MMMM').toString();
  month: string = moment().format('MMMM').toString();
  year: string = moment().format('YYYY').toString();
  ranges = [{
    displayText: 'Day',
    value: ViewTypes.DAY
  }, {
    displayText: 'Week',
    value: ViewTypes.WEEK
  }, {
    displayText: 'Month',
    value: ViewTypes.MONTH
  }, {
    displayText: 'Year',
    value: ViewTypes.YEAR,
  }, {
    displayText: 'Schedule',
    value: ViewTypes.SCHEDULE
  }];
  currentSelection: ViewTypes;

  getNavigationDirections() { return NavigationDirection; }

  constructor(
    private calendarActionsService: CalendarActionsService,
    private viewSwitcherService: ViewSwitcherService,
  ) { }

  onViewTypeChanged(value: ViewTypes) {
    this.currentSelection = value;
    console.log('From inside change method ---> ', value);
    this.viewSwitcherService.setView(value);
  }

  onDateSelected($event) {
    this.month = moment($event.value).format('MMMM').toString();
    this.year = moment($event.value).format('YYYY').toString();
    this.calendarActionsService.dateSelectionOccured($event.value);
  }

  navigateDay(direction: NavigationDirection) {
    this.calendarActionsService.dayNavigationOccured(direction);
  }

  ngOnInit(): void {
    this.currentSelection = ViewTypes.DAY;
  }

}
