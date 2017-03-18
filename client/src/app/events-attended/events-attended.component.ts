import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-events-attended',
  templateUrl: './events-attended.component.html',
  styleUrls: ['./events-attended.component.css'],
  providers: [UserService]
})
export class EventsAttendedComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.UserService.getList()
      .subscribe((user) => {
        this.user = user;
      });
  }
}
