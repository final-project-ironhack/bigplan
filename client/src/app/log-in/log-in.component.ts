import { Component, OnInit } from '@angular/core';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  error: string;
  formInfo = {
    username: '',
    password: ''
  };
  privateData: any = '';
  user: any;

  constructor(
    private loggedin: LoggedinService,
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
      (user) => this.successCb(user)
      );
    if (this.user) {
      this.router.navigate(['home/' + this.user._id]);
    }
  }

  login() {
    this.session.login(this.formInfo)
      .subscribe(
      (user) => {
        this.successCb(user),
          this.loggedin.checkLogged(user);
        this.router.navigate(['/home/' + user._id]);
      },
      (err) => this.errorCb(err)
      );
  }

  logout() {
    this.session.logout()
      .subscribe(
      () =>
        this.successCb(null),
      (err) =>
        this.errorCb(err)
      );
  };

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
