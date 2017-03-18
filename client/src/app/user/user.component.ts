import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user: any

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.UserService.getUserLogged()
      .subscribe((user) => {
        this.user = user;
      });
  }
}
