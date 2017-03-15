import { Routes } from '@angular/router';
import { MainBoardComponent } from './main-board/main-board.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsAttendedComponent } from './events-attended/events-attended.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingComponent } from './landing/landing.component';
import { EventInfoComponent } from './event-info/event-info.component';

export const routes: Routes = [
  //Path for MAIN BOARD & NAVIGATION
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'home/:id', component: MainBoardComponent },
  { path: 'home/:id/event-info/', component: EventInfoComponent },
  { path: 'usermenu/:id', component: UserMenuComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },

  //Paths for USER
  { path: 'user/:id', component: UserComponent },
  { path: 'user/events-attended/:id', component: EventsAttendedComponent },

  //Paths for EVENTS
  { path: 'event-list', component: EventListComponent },
  { path: 'home/:id/event/:id', component: EventComponent },
  { path: '', component: EventInfoComponent }
];
