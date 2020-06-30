import { Injectable } from '@angular/core';
import { ViewTypes } from 'src/config/view-type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  viewTypeChangeSource = new Subject<ViewTypes>();
  viewTypeChanged$ = this.viewTypeChangeSource.asObservable();

  constructor() { }

  setView(view: ViewTypes) {
    this.viewTypeChangeSource.next(view);
  }

}
