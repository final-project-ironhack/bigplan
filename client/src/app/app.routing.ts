import { Routes } from '@angular/router';

import { MainBoardComponent } from './main-board/main-board.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home/:id',  component: MainBoardComponent },
    { path: 'usermenu/:id', component: UserMenuComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'event/:id',  component: EventComponent },

];
