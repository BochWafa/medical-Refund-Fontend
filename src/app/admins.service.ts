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
sendMail(cin: number, access_token: string) {
  return this.http.get(this.url + '/sendmail/' + cin + '?access_token=' + access_token);
}
  getAll(access_token: string) {
    return this.http.get(this.url + '/all' + '?access_token=' + access_token);
  }
  getHistory(cin: number, access_token: string) {
    return this.http.get(this.url + '/history/' + cin + '?access_token=' + access_token);
  }
  delete(cin: number, access_token: string) {
    return this.http.delete(this.url + '/delete/' + cin + '?access_token=' + access_token);
  }
  getAdmin(cin: number, access_token: string) {
    return this.http.get(this.url + '/get/' + cin + '?access_token=' + access_token);
  }
  update(cin: number, a: Admin, access_token: string) {
    return this.http.put(this.url + '/updateadmin/' + cin + '?access_token=' + access_token, a );
  }


  getAdminByEmail(email: string, password: string, access_token: string) {

    return this.http.get(this.url + '/get/auth/' + email + '/' + password + '?access_token=' + access_token);

  }


}
