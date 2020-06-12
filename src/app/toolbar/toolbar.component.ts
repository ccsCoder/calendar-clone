import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  today: string = moment().format('dddd, DD MMMM').toString();
  month: string = moment().format('MMMM').toString();
  year: string = moment().format('YYYY').toString();
  ranges: string[] = ['Day', 'Week', 'Month', 'Year', 'Schedule', '4 days'];
  defaultSelection = 'Day';
  constructor() { }

  ngOnInit(): void {
  }

}
