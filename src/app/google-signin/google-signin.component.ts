import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginPersistanceService } from '../login-persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventProviderService } from '../event-provider.service';
import { ViewSwitcherService } from '../view-switcher.service';
import { CalendarQueryBuilderService } from '../calendar-query-builder.service';
import { ViewTypes } from 'src/config/view-type';


@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.sass']
})
export class GoogleSigninComponent implements OnInit {

  user = null;
  loggedIn: boolean;
  scopes: string[] = ['https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'];

  constructor(
    private loginPersistanceService: LoginPersistanceService,
    private eventProviderService: EventProviderService,
    private viewSwitcherService: ViewSwitcherService,
    private calendarQueryBuilder: CalendarQueryBuilderService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
  ) { }

  signIn = () => {
    this.showSnackbar('Please authenticate in the Google Popup...');
    const queryOptions = this.calendarQueryBuilder
    .setViewType(ViewTypes.DAY)
    .setDirection('NEXT')
    .build();
    this.eventProviderService.setQueryOptions(queryOptions);
    this.eventProviderService.signIn(this.onEventsLoaded);
  }

  logout = () => {
    this.eventProviderService.signOut();
    // Display the toast message
    this.showSnackbar('You have been logged out.');
    // remove the item from storage
    this.loginPersistanceService.removeLogin();
    this.loggedIn = false;
  }

  private onEventsLoaded = data => {
    this.loggedIn = true;
    this.user = data.userProfile;
    setTimeout(() => {
      this.showSnackbar(`Hi ${this.user.name} !`);
    }, 1000);
    this.loginPersistanceService.persistLogin(this.user);
  }

  private showSnackbar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      politeness: 'assertive',
      panelClass: ['warning', 'mat-toolbar']
    });
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(this.loginPersistanceService.isUserLoggedIn());
    if (loggedInUser !== null) {
      this.user = loggedInUser;
      this.loggedIn = true;
    } else {
    }
  }
}
