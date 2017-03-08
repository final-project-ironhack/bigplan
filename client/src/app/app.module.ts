import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { EventComponent } from './event/event.component';
import { EventOngoingComponent } from './event-ongoing/event-ongoing.component';
import { RaitingUserComponent } from './raiting-user/raiting-user.component';
import { RaitingEventComponent } from './raiting-event/raiting-event.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBoardComponent,
    EventComponent,
    EventOngoingComponent,
    RaitingUserComponent,
    RaitingEventComponent,
    SignInComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
