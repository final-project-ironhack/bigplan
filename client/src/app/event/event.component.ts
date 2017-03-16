import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})
export class EventComponent implements OnInit {
  user: any;
  error: any;
  event: any;

  @Input() eventDetail: string;
  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
}

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { console.log('USER', user); this.successCb(user) }
      );

    this.route.params.subscribe(item => {
      this.event = item;
    });
  }
    
  }
  ngOnChanges(changes: any){
    console.log(changes);
    console.log("Changes in Component");
  }

  // joinEvent() {
  //   const eventId = 0;
  //   console.log('USER', this.user);
  //   console.log('event',this.event);
  //   let param = eventId;
  //   //this.router.navigate(['event-info/' + eventId]);
  // }
  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
