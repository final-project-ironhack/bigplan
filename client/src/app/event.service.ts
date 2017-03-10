import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getEventList() {
    return this.http.get(`${this.BASE_URL}/api/event/get-all-events`)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }
}
