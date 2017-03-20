import { CreateEventComponent } from './create-event/create-event.component';
import { LandingComponent } from './landing/landing.component';
import { EventCreatorPageComponent } from './event-creator-page/event-creator-page.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsAttendedComponent } from './events-attended/events-attended.component';
import { EventComponent } from './event/event.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'home/:id', component: MainBoardComponent },
  { path: 'home/:id/event-info/:id', component: EventInfoComponent },
  { path: 'usermenu/:id', component: UserMenuComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'home/:id/event-creator-info', component: EventCreatorPageComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/events-attended/:id', component: EventsAttendedComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'home/:id/event/:id', component: EventComponent },
];
