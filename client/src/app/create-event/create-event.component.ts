import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  formInfo = {
    username: String,
    category: String,
    tags: String,
    description: String,
  };

  constructor( private eventS: EventService  ) { }

  ngOnInit() {
  }

  createEvent(){
    this.eventS.createEvent({
      username: this.formInfo.username,
      category: this.formInfo.category,
      description: this.formInfo.description,
      tags: this.formInfo.tags,
      location: this.getBrowserPosition()
    });
  }

  getBrowserPosition(){
    let coords;
    navigator.geolocation.getCurrentPosition(function(position){
       coords = position.coords;
    });
    return coords;
  }

  }
