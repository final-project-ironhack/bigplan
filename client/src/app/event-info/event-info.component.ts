import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { EventService } from '../event.service';
import { UserService } from '../user.service'
import { SessionService } from '../session.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  item: any;
  event: any;
  creator: any;
  participants: Array<any> = [];
  user: any;
  error: any;

  constructor(
    private session: SessionService,
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => { console.log('USER', user); this.successCb(user) }
      );

    let eventId;
    this.route.params.subscribe(paramsForEvent => {
      this.eventService.getEventById(paramsForEvent)
        .subscribe((eventSelected) => {

          this.event = eventSelected[0];
          console.log('aaaaa')
          //Apuntarte
          this.eventService.joinEventById(this.user, this.event).subscribe();


          //Buscar creador
          this.userService.getUserById(this.event.creator)
            .subscribe((userCreator) => {
              this.creator = userCreator;

              if (this.event.participant.length !== 0) {
                console.log('IMPORTANTE', this.event.participant.length)

                for (let i = 0; i < this.event.participant.length; i++) {
                  console.log('I', i)
                  console.log('caracola', this.event.participant[i])

                  this.userService.getUserById(this.event.participant[i])
                    .subscribe((participant) => {
                      console.log('::::::::::::.', participant)

                      this.participants.push(participant);
                      console.log('PARTICIPANTES', this.participants)
                    });
                };
              };
            });
        });
    })
  }
  update() {
    this.route.params.subscribe(paramsForEvent => {
      this.eventService.getEventById(paramsForEvent)
        .subscribe((eventSelected) => {
          //this.event = eventSelected;
          if (this.event.status === false) {
            console.log('El evento ha sido desactivado');
            this.router.navigate(['home/' + this.user._id]);
          } else {
            console.log('El evento sigue activo')
          }
        });
    });
  }

  // leave(){
  //
  // }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
