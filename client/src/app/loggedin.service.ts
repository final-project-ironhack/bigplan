import { Injectable } from '@angular/core';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Injectable()
export class LoggedinService {
  user: any;
  userLogged = new EventEmitter();
  constructor() { }

  checkLogged(user) {
    console.log('USERUSER: ', user);
    this.user = user;
    this.userLogged.emit(user);
  }

  getEmitter() {
    return this.userLogged;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user != undefined ? true : false;
  }
}
