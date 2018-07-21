import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
url = 'http://localhost:8080/user';
  constructor(private http: HttpClient) { }
 getAll(access_token: string) {
   return this.http.get(this.url + '/all?access_token=' + access_token);
}
}
