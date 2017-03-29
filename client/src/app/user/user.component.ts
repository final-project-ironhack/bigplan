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

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService
  ) { }

// In develop status
  ngOnInit() {
    this.UserService.getUserLogged()
      .subscribe((user) => {
        this.user = user;
      });

  }


}
