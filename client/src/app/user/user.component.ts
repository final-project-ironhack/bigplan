import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user: any
  id: number

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });
  }

  getUserDetails(id) {
    this.UserService.get(id)
      .subscribe((user) => {
        this.user = user;
      });
  }
}
