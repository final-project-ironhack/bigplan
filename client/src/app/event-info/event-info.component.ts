import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { UserService } from '../user.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  creator: any;
  error: any;
  event: any;
  item: any;
  participants: Array<any> = [];
  user: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private session: SessionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { this.successCb(user) }
      );

    let eventId;
    this.route.params.subscribe(paramsForEvent => {
      this.eventService.getEventById(paramsForEvent)
        .subscribe((eventSelected) => {
          this.event = eventSelected[0];
          console.log('aaaaa')
          this.eventService.joinEventById(this.user, this.event).subscribe();
          this.userService.getUserById(this.event.creator)
            .subscribe((userCreator) => {
              this.creator = userCreator;
              if (this.event.participant.length !== 0) {
                for (let i = 0; i < this.event.participant.length; i++) {
                  this.userService.getUserById(this.event.participant[i])
                    .subscribe((participant) => {
                      this.participants.push(participant);
                    });
                };
              };
            });
        });
    });
  };

  update() {
    this.route.params.subscribe(paramsForEvent => {
      this.eventService.getEventById(paramsForEvent)
        .subscribe((eventSelected) => {
          if (this.event.status === false) {
            this.router.navigate(['home/' + this.user._id]);
          } else {
            console.log('El evento sigue activo')
          }
        });
    });
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
