import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginPersistanceService } from '../login-persistance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.sass']
})
export class GoogleSigninComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private loginPersistanceService: LoginPersistanceService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
  ) { }

  signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this._snackBar.open('You have been logged out.', null, {
      duration: 2000,
    });
    // remove the item from storage
    this.loginPersistanceService.removeLogin();
    this.loggedIn = false;
    this.user = null;
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(this.loginPersistanceService.isUserLoggedIn());
    if (loggedInUser !== null) {
      this.user = loggedInUser;
      this.loggedIn = true;
      return;
    }
    // in case the user is Not logged in.
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loginPersistanceService.persistLogin(user);
      this.loggedIn = (user !== null);
      setTimeout(() => {
        this._snackBar.open(`Hi ${user.name} !`, null, { duration: 2000 });
      }, 500);
    });
  }

}
