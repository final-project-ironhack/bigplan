
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
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

    constructor(private session: SessionService) { }

    ngOnInit() {
      this.session.isLoggedIn()
        .subscribe(
          (user) => this.successCb(user)
        );
    }

    signup() {
      this.session.signup(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
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
