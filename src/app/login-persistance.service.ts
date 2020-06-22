import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginPersistanceService {

  constructor() { }

  persistLogin(user): void {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('loggedInUser');
  }

  removeLogin(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}
