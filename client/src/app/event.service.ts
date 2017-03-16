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
        console.log('EVENT.............................................:' + res.json());
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
    joinEventById(id){
      return this.http.post(`${BASE_URL}/api/event/get-event-by-id`, id,this.options)
        .map((res) => {
          return res.json();
        })
    }
}
