import { Routes } from '@angular/router';

import { MainBoardComponent } from './main-board/main-board.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { EventsAttendedComponent } from './events-attended/events-attended.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SignInComponent } from './sign-in/sign-in.component';


export const routes: Routes = [
    //Path for MAIN BOARD & NAVIGATION
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home/:id',  component: MainBoardComponent },
    { path: 'usermenu/:id', component: UserMenuComponent },
    { path: 'create-event', component: CreateEventComponent },
    { path: 'sign-in', component: SignInComponent },

    //Paths for USER
    { path: 'user/:id', component: UserComponent },
    { path: 'user/events-attended/:id',  component: EventsAttendedComponent },
    //Paths for EVENTS
    { path: 'event/:id',  component: EventComponent },


];
