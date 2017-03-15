import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})
export class EventComponent implements OnInit {
  @Input() eventDetail: string;
  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {

  }
  ngOnChanges(changes: any){
    console.log(changes);
    console.log("Changes in Component");
  }

  joinEvent(){
    const eventId = '58c83783395bf229414898cd'
    this.eventService.joinEventById(eventId);

  }

}
