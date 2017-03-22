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
  creator: any;



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
        this.successCb(user)

        this.eventService.getEventByCreatorId(user)
          .subscribe((eventSelected) => {
            this.creator = user;
            this.event = eventSelected;
            if (this.event.participant.length !== 0) {

              for (let i = 0; i < this.event.participant.length; i++) {

                this.userService.getUserById(this.event.participant[i])
                  .subscribe((participant) => {
                    this.participants.push(participant);
                  });
              }
            }
          });

      });

  };
  successCb(user) {
    this.user = user;
    this.error = null;
  }

  finishEvent() {
    this.eventService.closeEvent(this.event).subscribe();
    this.router.navigate(['/home/'+this.creator._id]);
  }
}
