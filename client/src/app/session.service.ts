import { environment } from '../environments/environment'
import { EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const BASE_URL = environment.apiUrl;

@Injectable()
export class SessionService {
  BASE_URL: string = 'environment';
  emitter: EventEmitter<Object> = new EventEmitter<Object>();
  options: Object = { withCredentials: true };

  constructor(private http: Http) { }

  getPrivateData() {
    return this.http.get(`${BASE_URL}/api/user/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  isLoggedIn() {
    return this.http.get(`${BASE_URL}/api/user/loggedin`, this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  login(user) {
    return this.http.post(`${BASE_URL}/api/user/login`, user, this.options)
      .map(res => res.json())
      .map(user => { this.emitter.emit(user); return user })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${BASE_URL}/api/user/logout`, {}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  signup(user) {
    return this.http.post(`${BASE_URL}/api/user/signup`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
