declare var gapi;

import { Injectable } from '@angular/core';
import { CalendarApiConfig } from 'src/apiConfig';
import * as moment from 'moment';

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
        googleAuthInstance.isSignedIn.listen(this.updateSigninStatus);
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
          gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            // timeMax: moment().add(1, 'days').toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
          }).then(response => {
            apiResponse.events = response.result.items;
            // Finally call the callback.
            apiQueryPerformedCallback(apiResponse);
          });
        });
      }, error => console.error(`Something went wrong... !!! : ${error.message}`));
    });
  }

  private updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      } else {
      }
    }
}
