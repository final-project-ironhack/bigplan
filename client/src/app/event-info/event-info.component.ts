import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  item: any
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let information = this.route.params.subscribe(params => {
      console.log(params["id"]);
    })

  }
}
