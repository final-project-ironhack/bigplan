import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment'


@Injectable()
export class UpdateEventsService {

  constructor() { }
    private url = 'environment';
    private socket;

    updateEvent() {
      let observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on('updateSocketListOfEvents', (eventListUpdated) => {
          observer.next(eventListUpdated);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
    }
  }
