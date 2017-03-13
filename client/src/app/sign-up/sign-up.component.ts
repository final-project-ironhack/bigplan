
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => this.successCb(user)
      );
  }

  signup() {

    this.session.signup(this.formInfo)
      .subscribe(
      (user) => {
        this.successCb(user),
        this.router.navigate(['home/' + user._id]);
      },
      (err) => this.errorCb(err)
      );
  }
  logout() {
    this.session.logout()
      .subscribe(
      () => this.successCb(null),
      (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
