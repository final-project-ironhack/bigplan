import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment'
const BASE_URL  = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUserLogged() {
    return this.http.get(`${BASE_URL}/api/user/get-user-logged`)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  getList() {
    return this.http.get(`${BASE_URL}/api/user/get-all-users`)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  // In develop status
  getUserById(id) {
    console.log('ID',id)
    return this.http.get(`${BASE_URL}/api/user/get-user-by-id/
`+id)
      .map((res) => {
        console.log(res.json())
        return res.json()
      });
  }

  // getUser(id){
  //   let  allUsers;
  //   let userSelected;
  //
  //   this.http.get(`${this.BASE_URL}/api/user/getAllUsers`)
  //     .map((res) => {
  //       console.log(res.json());
  //       allUsers = res.json();
  //     });
  //     for(let user of allUsers){
  //       if(user._id === id){
  //         userSelected = user;
  //       }
  //     }
  //     return userSelected;
  // }

  edit(user) {
    return this.http.put(`${BASE_URL}/user/${user.id}`, user)
      .map((res) => res.json());
  }

  remove(id) {
    return this.http.delete(`${BASE_URL}/users/${id}`)
      .map((res) => res.json());
  }
}
