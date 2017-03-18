import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { LoggedinService } from '../loggedin.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],

})
export class CreateEventComponent implements OnInit {
  user: any;
  error: string;
  formInfo = {
    name: '',
    category: '',
    tags: '',
    description: '',
  };
  coords = {};

  constructor(
    private eventService: EventService,
    private loggedin: LoggedinService,
    private router: Router,
    private session: SessionService
  ) { };

  ngOnInit() {
    const instance = this;
    this.session.isLoggedIn()
      .subscribe(
      (user) => { this.successCb(user) }
      );
  };
  createEvent() {
    this.getBrowserPosition().then((pos) => {
      let eventObject = {
        name: this.formInfo.name,
        category: this.formInfo.category,
        tags: this.formInfo.tags,
        description: this.formInfo.description,
        image: '',
        location: pos,
        creator: this.user._id
      };

      this.eventService.createEvent(eventObject).subscribe((event) => {
        this.router.navigate(['home/' + this.user._id + '/event-creator-info']);
      });
    });

  }

  getBrowserPosition() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(pos);
      });
    });
  }

  successCb(user) {
    this.user = user;
  }
}
