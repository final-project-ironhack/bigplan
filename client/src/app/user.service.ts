import { environment } from '../environments/environment'
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
const BASE_URL = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  edit(user) {
    return this.http.put(`${BASE_URL}/user/${user.id}`, user)
      .map((res) => res.json());
  }

  getList() {
    return this.http.get(`${BASE_URL}/api/user/get-all-users`)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  getUserById(id) {
    console.log('ID', id)
    return this.http.get(`${BASE_URL}/api/user/get-user-by-id/` + id)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  getUserLogged() {
    return this.http.get(`${BASE_URL}/api/user/get-user-logged`)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  remove(id) {
    return this.http.delete(`${BASE_URL}/users/${id}`)
      .map((res) => res.json());
  }
}
