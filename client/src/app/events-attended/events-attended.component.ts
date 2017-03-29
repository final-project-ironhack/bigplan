import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { EventService } from './../event.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-events-attended',
  templateUrl: './events-attended.component.html',
  styleUrls: ['./events-attended.component.css'],
  providers: [UserService]
})

export class EventsAttendedComponent implements OnInit {
  events: any;
  user: any;
  error: any;

  constructor(
    private session: SessionService,
    private EventService: EventService,
    private route: ActivatedRoute,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => {
        this.successCb(user)
        const eventS = this.EventService;
        eventS.getEventByCreatorId(user)
        .subscribe(events => {
          this.events = events;
        })
      });
};
  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
