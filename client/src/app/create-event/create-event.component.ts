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
  ){

  };

  ngOnInit() {

    const instance = this;
    console.log(this.loggedin.getUser())
    this.user=this.loggedin.getUser()
    .subscribe((user)=> {
      this.user = user
      console.log(user);
    }
    );
  };
    createEvent(){
      this.getBrowserPosition().then((pos) => {
        let eventObject = {
          name: this.formInfo.name,
          category: this.formInfo.category,
          tags: this.formInfo.tags,
          description: this.formInfo.description,
          image: '',
          location: pos,
          // creator: this.user._id
        };

        this.eventService.createEvent(eventObject).subscribe((event)=>{
          console.log('tu madre es un pendón');
          this.router.navigate(['home/' + this.user._id]);
        });
      });

    }

    getBrowserPosition(){
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(pos);
          console.log(pos);
        });
      });
    }

    logUser(){
      console.log(this.user);
    }

  }
