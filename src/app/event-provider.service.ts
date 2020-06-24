declare var gapi;

import { Injectable } from '@angular/core';
import { CalendarApiConfig } from 'src/apiConfig';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {

  scopes: string[] = ['https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'];

  isAuthorized = false;

  apiConfig = {
    clientId: CalendarApiConfig.clientId,
    scope: this.scopes.join(' '),
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  };

  eventsRefreshedSource = new Subject();

  // this is the guy to subscribe to.
  eventsRefreshed$ = this.eventsRefreshedSource.asObservable();

  queryOptions = {
    timeMin: moment().toISOString(),
    timeMax: null,
  };

  constructor() {}

  signOut() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: CalendarApiConfig.clientId,
        scope: this.scopes.join(' '),
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
      }).then(() => {
        gapi.auth2.getAuthInstance().signOut();
      });
    });
  }

  setQueryOptions(queryOptions) {
    this.queryOptions = Object.assign({}, this.queryOptions, queryOptions);
    console.log('Inside setQueryOptions: ', this.queryOptions);
  }

  resetQueryOptions() {
    this.queryOptions = {
      timeMin: moment().toISOString(),
      timeMax: null,
    };
  }

  private getCalendarQueryOptions() {
    const q: any = {
      calendarId: 'primary',
      timeMin: this.queryOptions.timeMin,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    };
    if (this.queryOptions.timeMax !== null) {
      q.timeMax = this.queryOptions.timeMax;
    }
    console.log('Inside getCalendarQueryOptons(): ', q);
    return q;
  }

  signIn(apiQueryPerformedCallback) {
    // do EVERYTHING HERE !!!
    const apiResponse: any = {};
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: CalendarApiConfig.clientId,
        scope: this.scopes.join(' '),
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
      }).then(() => {
        // Get the auth instance to use later.
        const googleAuthInstance = gapi.auth2.getAuthInstance();
        // Listen for sign in state changes
        // googleAuthInstance.isSignedIn.listen(this.updateSigninStatus);
        // Sign in.
        googleAuthInstance.signIn().then(() => {
          const userProfile = googleAuthInstance.currentUser.get().getBasicProfile();
          apiResponse.userProfile = {
            id: userProfile.getId(),
            name: userProfile.getName(),
            imageUrl: userProfile.getImageUrl(),
            email: userProfile.getEmail(),
          };
          // make the api call.
          gapi.client.calendar.events.list(this.getCalendarQueryOptions()).then(response => {
            apiResponse.events = response.result.items;
            // Finally call the callback.
            apiQueryPerformedCallback(apiResponse);
            // Put the next item in the observalbe stream.
            this.eventsRefreshedSource.next(apiResponse.events);
          });
        });
      }, error => console.error(`Something went wrong... !!! : ${error.message}`));
    });
  }

  // private updateSigninStatus = (isSignedIn: boolean) => {
  //   if (isSignedIn) {
  //     } else {
  //     }
  //   }
}
