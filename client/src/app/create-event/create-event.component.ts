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
    username: '',
    category: '',
    tags: '',
    description: '',
  };

  constructor(
    private router: Router,
    private loggedin: LoggedinService,
    private session: SessionService,
    private eventService: EventService
  ){

  };

  ngOnInit() {
    console.log(this.loggedin.getUser())
    this.user=this.loggedin.getUser()
    // .subscribe((user)=> {
    //   this.user = user
    //   console.log(user);
    // }
    // );
  };

    createEvent(){
      console.log("create event", this.user._id);
      this.eventService.createEvent({
        creator: this.user._id,
        category: this.formInfo.category,
        description: this.formInfo.description,
        tags: this.formInfo.tags,
        location: this.getBrowserPosition()
      }).subscribe((event)=>{
        console.log('tu madre es un pendón')
        this.router.navigate(['home/' + this.user._id]);
      });
    }

    getBrowserPosition(){
      let coords;
      navigator.geolocation.getCurrentPosition(function(position) {
        coords = position.coords;
      });
      return coords;
    }
    logUser(){
      console.log(this.user);
    }

  }
