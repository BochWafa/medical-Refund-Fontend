import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  username = 'cynapsys';
  password = 'cynapsys1';
  user_id = 'gat-cynapsys';
  user_secret = 'cynapsys-gat';

  data =  'grant_type=password' +
                '&scope=read' +
                '&username=' + this.username +
                '&password=' + this.password;



  url = 'http://localhost:8080/oauth/token';



  constructor(private http: HttpClient) {
  }








 getAccessToken() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': ('Basic ' + btoa(this.user_id + ':' + this.user_secret))
    });



    return this.http.post(this.url, this.data, {headers: headers, responseType: 'json'});
  }


}
