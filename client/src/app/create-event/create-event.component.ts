import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoggedinService } from '../loggedin.service';
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
    private router: Router,
    private loggedin: LoggedinService,
    private session: SessionService,
    private eventService: EventService
  ) {

  };

  ngOnInit() {
    const instance = this;
    this.session.isLoggedIn()
      .subscribe(
      (user) => { console.log(user); this.successCb(user) }
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

/*
  goBack() {
    this.session.login(this.formInfo)
      .subscribe(
      (user) => {
        this.successCb(user),
          this.loggedin.checkLogged(user);
          console.log('id found', user._id)
          this.router.navigate(['home/' + user._id]);
          //this.router.navigate(['sign-up']);
      },
      (err) => this.errorCb(err)
      );
  }
*/



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

  logUser() {
    console.log(this.user);
  }

  successCb(user) {
    this.user = user;
  /*
    logout() {
      this.session.logout()
        .subscribe(
        () =>
          this.successCb(null),
        (err) => this.errorCb(err)
        );

    }

    logUser(){
      console.log(this.user);
    }

    successCb(user) {
      console.log('USER:::::::::::::::::', user)
      this.user = user;
    }

    errorCb(err) {
      this.error = err;
      this.user = null;
    }
    */


  }
}
