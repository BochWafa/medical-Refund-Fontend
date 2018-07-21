import { Injectable } from '@angular/core';
import {Assure} from './assure';
import {HttpClient} from '@angular/common/http';
import {Admin} from './Admin';
@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  url = 'http://localhost:8080/admin';
  constructor(private http: HttpClient) { }

AdminsService() {}

addAdmin(a: Admin, access_token: string) {
  return this.http.post(this.url + '/create?access_token=' + access_token, a);
}
  getAll() {
    return this.http.get(this.url + '/all');
  }
  getHistory(cin: number) {
    return this.http.get(this.url + '/history/' + cin);
  }
  delete(cin: number, access_token: string) {
    return this.http.delete(this.url + '/delete/' + cin + '?access_token=' + access_token);
  }
  getAdmin(cin: number, access_token: string) {
    return this.http.get(this.url + '/get/' + cin + '?access_token=' + access_token);
  }
  update(cin: number, a: Admin) {
    return this.http.put(this.url + '/update/' + cin, a );
  }


  getAdminByEmail(email: string, password: string, access_token: string) {

    return this.http.get(this.url + '/get/auth/' + email + '/' + password + '?access_token=' + access_token);

  }


}
