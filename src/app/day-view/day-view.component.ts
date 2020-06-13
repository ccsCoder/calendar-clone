import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.sass']
})
export class DayViewComponent implements OnInit {

  start = 0;
  end = 23;

  constructor() { }

  ngOnInit(): void {
  }

}
