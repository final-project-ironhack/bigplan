import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment'

const BASE_URL = environment.apiUrl;


@Injectable()
export class EventService {
  options: Object = { withCredentials: true };

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getEventList() {
    return this.http.get(`${BASE_URL}/api/event/get-all-events`)
      .map((res) => {
        return res.json()
      });
  }

  createEvent(event) {
    return this.http.post(`${BASE_URL}/api/event/create-event`, event, this.options)
      .map((res) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getEventById(obj) {
    return this.http.get(`${BASE_URL}/api/event/get-event-by-id/` + obj.id)
      .map((res) => {
        return res.json()
      });
  }

  getEventByCreatorId(obj) {
    return this.http.get(`${BASE_URL}/api/event/get-event-by-creator-id/` + obj._id)
      .map((res) => {
        return res.json();
      });
  }

  joinEventById(user, event) {
    let dupla = { user_id: user._id, event_id: event._id };
    console.log(dupla)
    return this.http.put(`${BASE_URL}/api/event/go-event`, dupla, this.options)
      .map((res) => {
        return res.json();
      })
  }
  closeEvent(obj) {

    console.log('11111111111111', obj._id)
    return this.http.put(`${BASE_URL}/api/event/finish-event/` + obj._id, this.options)
      .map((res) => {
        return res.json();
      });
  }

  // leaveEvent(user,event){
  //   return this.http.update(`${this.BASE_URL}/api/user`)
  // }


}
