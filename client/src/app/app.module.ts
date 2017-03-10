import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { EventComponent } from './event/event.component';
import { EventOngoingComponent } from './event-ongoing/event-ongoing.component';
import { RaitingUserComponent } from './raiting-user/raiting-user.component';
import { RaitingEventComponent } from './raiting-event/raiting-event.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

import { UserService } from './user.service';
import { EventsAttendedComponent } from './events-attended/events-attended.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventListComponent } from './event-list/event-list.component';

import { SessionService } from "./session.service";




@NgModule({
  declarations: [
    AppComponent,
    MainBoardComponent,
    EventComponent,
    EventOngoingComponent,
    RaitingUserComponent,
    RaitingEventComponent,
    SignInComponent,
    UserComponent,
    UserMenuComponent,
    EventsAttendedComponent,
    CreateEventComponent,
    EventListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [UserService,SessionService],
  bootstrap: [AppComponent]

})
export class AppModule { }
