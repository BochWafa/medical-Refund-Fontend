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

addAdmin(a: Admin) {
  return this.http.post(this.url + '/create', a);
}
sendMail(cin: number) {
  return this.http.get(this.url + '/sendmail/' + cin);
}
  getAll() {
    return this.http.get(this.url + '/all');
  }
  getHistory(cin: number) {
    return this.http.get(this.url + '/history/' + cin);
  }
  delete(cin: number) {
    return this.http.delete(this.url + '/delete/' + cin);
  }
  getAdmin(cin: number) {
    return this.http.get(this.url + '/get/' + cin);
  }
  update(cin: number, a: Admin) {
    return this.http.put(this.url + '/updateadmin/' + cin, a );
  }
}
