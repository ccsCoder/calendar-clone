import { Injectable } from '@angular/core';
import { CalendarApiConfig } from 'src/apiConfig';
import { from, of, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {

  googleAuthInstance = null;

  scopes: string[] = ['https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'];

  isAuthorized = false;

  constructor() {
    // instantiate the gapi client.
    (window as any).gapi.load('client:auth2', this.initClient);
  }

  private getUserProfile = () => {
    if (this.googleAuthInstance.isSignedIn.get()) {
      const profile = this.googleAuthInstance.currentUser.get().getBasicProfile();
      return of({
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
      });
    }
  }

  fetchUpcomingEvents = () => {
    if (this.isAuthorized) {
      // Make API request
      const eventsPromise = (window as any).gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      });
      // combine the two observable results and return a final one.
      return zip(from(eventsPromise), this.getUserProfile())
        .pipe(map(res => Object.assign(
          {}, {
            userProfile: {
              ...res[1]
            },
            events: {
              ...(res[0] as any).result.items
            }
          },
        )));
    } else {
      this.googleAuthInstance.signIn();
    }
  }

  private initClient = () => {
    const gapiInstance = (window as any).gapi;
    gapiInstance.client.init({
      // apiKey: CalendarApiConfig.apiKey,
      clientId: CalendarApiConfig.clientId,
      scope: this.scopes.join(' '),
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    }).then(() => {
      // Get the auth instance to use later.
      this.googleAuthInstance = gapiInstance.auth2.getAuthInstance();
      console.log('Got the Google Auth Instance.');
      // Listen for sign in state changes
      this.googleAuthInstance.isSignedIn.listen(this.updateSigninStatus);
      // Handle the initial sign-in state.
      this.updateSigninStatus(this.googleAuthInstance.isSignedIn.get());
    }, error => console.error(`Unable to get Auth Instance: ${error.message}`));
  }

  private updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      this.isAuthorized = isSignedIn;
      this.fetchUpcomingEvents();
      } else {
        this.isAuthorized = false;
      }
    }

  fetchEvents() {
    return [
      {
        id: 1,
        name: 'Meeting with Sangatha',
        attendees: 'Gajodhar, Sangatha',
        startTime: '11:00',
        endTime: '12:15'
      },
      {
        id: 2,
        name: 'Buy the milk',
        attendees: 'Gajodhar, Sangatha',
        startTime: '01:00',
        endTime: '02:00'
      }
    ];
  }
}
