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

  signInWithGoogle(): void {
      this.eventProviderService.fetchUpcomingEvents().subscribe(data => {
        // emit this data for rendering events.
        this.eventDataRefreshed.emit(data.events);
        this.loggedIn = true;
        this.user = data.userProfile;
        this.loginPersistanceService.persistLogin(this.user);
        this._snackBar.open(`Hi ${this.user.name} !`, null, { duration: 2000 });
      });
  }

  logout() {
    this.eventProviderService.logout();
    // Display the toast message
    this._snackBar.open('You have been logged out.', null, {
      duration: 2000,
    });
    // remove the item from storage
    this.loginPersistanceService.removeLogin();
    this.loggedIn = false;
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(this.loginPersistanceService.isUserLoggedIn());
    if (loggedInUser !== null) {
      this.loggedIn = true;
      this.user = loggedInUser;
      return;
    }
  }
}
