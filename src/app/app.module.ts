// Angular Material Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatSnackBarModule } from '@angular/material/snack-bar';



// Components
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DayViewComponent } from './day-view/day-view.component';
import { DayTimeSlotComponent } from './day-time-slot/day-time-slot.component';
import { DayViewEventComponent } from './day-view-event/day-view-event.component';
import { EventProviderService } from './event-provider.service';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { LoginPersistanceService } from './login-persistance.service';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ToolbarComponent,
    AvatarComponent,
    DayViewComponent,
    DayTimeSlotComponent,
    DayViewEventComponent,
    GoogleSigninComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    SocialLoginModule,
  ],
  providers: [
    EventProviderService,
    LoginPersistanceService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '902255523439-90cbpoon64it2c0m7p7se34slhb7bnsp.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
