import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService {
  BASE_URL: string = 'http://localhost:3000';
  emitter : EventEmitter<Object> = new EventEmitter<Object>();
  options: Object ={ withCredentials: true};

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${this.BASE_URL}/api/user/signup`,user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/api/user/login`,user, this.options)
      .map(res => res.json())
      .map(user => { this.emitter.emit(user); return user })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/api/user/logout`,{}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${this.BASE_URL}/api/user/loggedin`,this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`${this.BASE_URL}/api/user/private`,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
