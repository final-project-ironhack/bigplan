import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EventService {

  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getEventList() {
    return this.http.get(`${this.BASE_URL}/api/event/get-all-events`)
      .map((res) => {
        return res.json()
      });
  }
}
