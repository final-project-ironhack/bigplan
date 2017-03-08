import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  BASE_URL: string = 'http://localhost:3000';
    constructor(private http: Http) {}
    getList() {
      return this.http.get(`${this.BASE_URL}/api/user/getAllUsers`)
        .map((res) => {
          console.log(res.json())
          return res.json()
        });
    }

    get(id) {
      return this.http.get(`${this.BASE_URL}/user/${id}`)
        .map((res) => res.json());
    }

    edit(user) {
      return this.http.put(`${this.BASE_URL}/user/${user.id}`, user)
        .map((res) => res.json());
    }

    remove(id) {
      return this.http.delete(`${this.BASE_URL}/users/${id}`)
        .map((res) => res.json());
    }

}
