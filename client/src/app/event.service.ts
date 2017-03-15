import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EventService {
  options: Object = { withCredentials: true };

  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getEventList() {
    return this.http.get(`${this.BASE_URL}/api/event/get-all-events`)
      .map((res) => {
        return res.json()
      });
  }

  createEvent(event) {
    return this.http.post(`${this.BASE_URL}/api/event/create-event`, event, this.options)
      .map((res) => {
        console.log('EVENT.............................................:' + res.json());
         return res.json();
      })
      .catch(this.handleError);
  }

  getEventById(id) {
    return this.http.get(`${this.BASE_URL}/api/event/get-event-by-id`)
      .map((res) => {
        return res.json()
      });
    }
}
