import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginPersistanceService {

  constructor() { }

  persistLogin(user: SocialUser): void {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('loggedInUser');
  }

  removeLogin(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}
