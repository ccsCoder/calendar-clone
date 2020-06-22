import { Component, OnInit } from '@angular/core';
import { LoginPersistanceService } from '../login-persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventProviderService } from '../event-provider.service';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.sass']
})
export class GoogleSigninComponent implements OnInit {

  loggedIn: boolean;
  scopes: string[] = ['https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'];


  constructor(
    private loginPersistanceService: LoginPersistanceService,
    private eventProviderService: EventProviderService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
  ) { }

  signInWithGoogle(): void {
      // this.eventProviderService.getUpcomingEvents();
      this.eventProviderService.fetchUpcomingEvents();
  }

  logout() {
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
    // if (loggedInUser !== null) {
    //   this.loggedIn = true;
    //   return;
    // }
    // // in case the user is Not logged in.
    // this.authService.authState.subscribe(user => {
    //   this.user = user;
    //   this.loginPersistanceService.persistLogin(user);
    //   this.loggedIn = (user !== null);
    //   setTimeout(() => {
    //     this._snackBar.open(`Hi ${user.name} !`, null, { duration: 2000 });
    //     // this.eventProviderService.getUpcomingEvents();
    //   }, 500);
    // });
  }

}
