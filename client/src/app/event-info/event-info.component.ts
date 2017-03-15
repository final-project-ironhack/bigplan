import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { EventService } from '../event.service';
@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  item: any
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) { }

  ngOnInit() {
      let eventId;
      this.route.params.subscribe(params => {
        let event = this.eventService.getEventById(params);
        console.log( params);

      });
         //console.log('eventId', eventId);

         //console.log(event);
  }
}
