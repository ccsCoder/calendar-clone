import { Component, OnInit } from '@angular/core';
import { OperationIndicationService } from '../operation-indication.service';
import { ViewSwitcherService } from '../view-switcher.service';
import { ViewTypes } from 'src/config/view-type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  loading = false;
  viewType: ViewTypes = ViewTypes.DAY;

  constructor(
    private operationIndicator: OperationIndicationService,
    private viewSwitcherService: ViewSwitcherService,
  ) { }

  private subscribeToLoadingStatus() {
    this.operationIndicator.requestInFlight$.subscribe((isInFlight: boolean) => {
      this.loading = isInFlight;
    });
  }

  private subscribeToViewChange() {
    this.viewSwitcherService.viewTypeChanged$.subscribe((newView: ViewTypes) => {
      this.viewType = newView;
      console.log('Changed view to - ', this.viewType);
    });
  }

  getViewTypes() {
    return ViewTypes;
  }

  ngOnInit(): void {
    this.subscribeToLoadingStatus();
    this.subscribeToViewChange();
  }
}
