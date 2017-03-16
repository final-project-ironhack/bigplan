import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { EventService } from '../event.service';
import { UserService } from '../user.service'
import { SessionService } from '../session.service';
@Component({
  selector: 'app-event-creator-page',
  templateUrl: './event-creator-page.component.html',
  styleUrls: ['./event-creator-page.component.css']
})
export class EventCreatorPageComponent implements OnInit {
  user: any;
  error: any;
  event: any;
  participants: Array<any> = [];


  constructor(
    private session: SessionService,
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    private route: ActivatedRoute

  ) {

  }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => {
        console.log('USER///', user); this.successCb(user)


        this.eventService.getEventByCreatorId(user)
          .subscribe((eventSelected) => {
            this.event = eventSelected;

            if (this.event[0].participant.length !== 0) {
              for (let i = 0; i < this.event.length; i++) {
                console.log('I', i)
                console.log('caracola', this.event[0].participant[i])

                this.userService.getUserById(this.event[0].participant[i])
                  .subscribe((participant) => {
                    console.log('::::::::::::.', participant)

                    this.participants.push(participant);
                    console.log('PARTICIPANTES', this.participants)
                  });
              }
            }
          });

      });
};
  successCb(user) {

    this.user = user;
    console.log('ESTE USUARIO', user)
    this.error = null;
  }
}
