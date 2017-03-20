import { environment } from '../environments/environment'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const BASE_URL = environment.apiUrl;

@Injectable()
export class EventService {
  options: Object = { withCredentials: true };

  constructor(private http: Http) { }

  closeEvent(obj) {
    return this.http.put(`${BASE_URL}/api/event/finish-event/` + obj._id, this.options)
      .map((res) => {
        return res.json();
      });
  }

  createEvent(event) {
    return this.http.post(`${BASE_URL}/api/event/create-event`, event, this.options)
      .map((res) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getEventByCreatorId(obj) {
    return this.http.get(`${BASE_URL}/api/event/get-event-by-creator-id/` + obj._id)
      .map((res) => {
        return res.json();
      });
  }

  getEventById(obj) {
    return this.http.get(`${BASE_URL}/api/event/get-event-by-id/` + obj.id)
      .map((res) => {
        return res.json()
      });
  }

  getEventList() {
    return this.http.get(`${BASE_URL}/api/event/get-all-events`)
      .map((res) => {
        return res.json()
      });
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  joinEventById(user, event) {
    let dupla = { user_id: user._id, event_id: event._id };
    console.log(dupla)
    return this.http.put(`${BASE_URL}/api/event/go-event`, dupla, this.options)
      .map((res) => {
        return res.json();
      })
  }
}
