import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationDirection } from 'src/config/navigation-direction';

@Injectable({
  providedIn: 'root'
})
export class CalendarActionsService {

  dayNavigationActionSource = new Subject<NavigationDirection>();
  dayNavigationAction$ = this.dayNavigationActionSource.asObservable();

  constructor() { }

  // When navigation has occurred.
  dayNavigationOccured(direction: NavigationDirection) {
    this.dayNavigationActionSource.next(direction);
  }
}
