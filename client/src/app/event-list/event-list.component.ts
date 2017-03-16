import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [EventService]
})
export class EventListComponent implements OnInit {

event: any

  constructor(
    private route: ActivatedRoute,
    private EventService: EventService
  ) { }

  ngOnInit() {
    this.EventService.getEventList()
      .subscribe((event) => {
        this.event = event;
      });
    }
}
