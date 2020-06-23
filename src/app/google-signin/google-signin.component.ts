import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginPersistanceService } from '../login-persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventProviderService } from '../event-provider.service';


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

  @Output() eventDataRefreshed = new EventEmitter<any>();


  constructor(
    private loginPersistanceService: LoginPersistanceService,
    private eventProviderService: EventProviderService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
  ) { }

  signIn = () => {
    this.eventProviderService.signIn(this.onEventsLoaded);
  }

  logout = () => {
    // this.eventProviderService.logout();
    // Display the toast message
    this._snackBar.open('You have been logged out.', null, {
      duration: 2000,
    });
    // remove the item from storage
    this.loginPersistanceService.removeLogin();
    this.loggedIn = false;
  }

  private onEventsLoaded = data => {
    console.group('From events loaded callback...');
    console.log('Events loaded... !');
    console.log(data);
    console.groupEnd();
    this.eventDataRefreshed.emit(data.events);
    this.loggedIn = true;
    this.user = data.userProfile;
    this.loginPersistanceService.persistLogin(this.user);
    this._snackBar.open(`Hi ${this.user.name} !`, null, { duration: 2000 });
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(this.loginPersistanceService.isUserLoggedIn());
    if (loggedInUser !== null) {
      console.log('Found a logged in user, refresing events...');
      // this.eventProviderService.setAuthorized(true);  // user logged in previously.
      // this.eventProviderService.handleInitialization(() => {
      //   // Refresh the events if the user is already logged on.
      //   this.eventProviderService.fetchUpcomingEvents().subscribe(data => this.onEventsLoaded(data));
      // })
    } else {
      console.log('Did not find any logged in User');
      // this.eventProviderService.setAuthorized(false);
    }
  }
}
