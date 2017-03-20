import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsAttendedComponent } from './events-attended/events-attended.component';
import { EventComponent } from './event/event.component';
import { EventCreatorPageComponent } from './event-creator-page/event-creator-page.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventService} from './event.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoggedinService } from './loggedin.service';
import { MainBoardComponent } from './main-board/main-board.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RaitingUserComponent } from './raiting-user/raiting-user.component';
import { SessionService } from "./session.service";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';
import { UserComponent } from './user/user.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    EventsAttendedComponent,

    EventComponent,
    EventCreatorPageComponent,
    EventListComponent,
    EventInfoComponent,
    LandingComponent,
    LogInComponent,
    MainBoardComponent,
    MainNavbarComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [EventService, LoggedinService, SessionService, UserService],
  bootstrap: [AppComponent]

})
export class AppModule { }
