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
      (user) => { console.log('USER',user); this.successCb(user) }
      );

    let eventId;
    this.route.params.subscribe(paramsForEvent => {
      this.eventService.getEventById(paramsForEvent)
        .subscribe((eventSelected) => {
          this.event = eventSelected;
          // console.log('PARTICIPANTE', this.event[0].participant)

          //Buscar creador
          this.userService.getUserById(this.event[0].creator)
            .subscribe((userCreator) => {
              this.creator = userCreator;
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
          this.event = eventSelected;
          if (this.event.status === false) {
            console.log('El evento ha sido desactivado')
            this.router.navigate(['home/'+this.user.id]);
          }else{
            console.log('El evento sigue activo')
          }
        });
    });
  }

  // leave(){
  //
  // }

  successCb(user) {
    console.log('USER:::::::::::::::::', user)
    this.user = user;
    this.error = null;
  }
}
