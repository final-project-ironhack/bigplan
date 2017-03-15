import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']

})
export class EventComponent implements OnInit {
  @Input() eventDetail: string;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: any){
    console.log(changes);
    console.log("Changes in Component");
  }

}
