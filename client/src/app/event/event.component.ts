import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})

export class EventComponent implements OnInit {
  changes: any;
  event: any;
  error: any;
  user: any;

  @Input() eventDetail: string;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => {
        this.successCb(user)
      });

    this.route.params.subscribe(item => {
      this.event = item;
    });
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
