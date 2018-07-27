import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gestionnaire} from './Gestionnaire';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesService {

  url = 'http://localhost:8080/gestionnaire';
  constructor(private http: HttpClient) { }
  addGestionnaire(a: Gestionnaire, access_token: string) {
    return this.http.post(this.url + '/create?access_token=' + access_token, a);
  }
  getAll(access_token: string) {
    return this.http.get(this.url + '/all' + '?access_token=' + access_token);
  }
  delete(cin: number, access_token: string) {
    return this.http.delete(this.url + '/delete/' + cin + '?access_token=' + access_token);
  }
  add(gestionnaire, access_token: string) {
    return this.http.post(this.url + '/create' + '?access_token=' + access_token, gestionnaire);
  }
  sendMail(cin: number, access_token: string) {
    return this.http.get(this.url + '/sendmail/' + cin + '?access_token=' + access_token);
  }
  getHistory(cin: number, access_token: string) {
    return this.http.get(this.url + '/history/' + cin + '?access_token=' + access_token);
  }
  getGestionnaire(cin: number, access_token: string) {
    return this.http.get(this.url + '/get/' + cin + '?access_token=' + access_token);
  }
  update(cin: number, a: Gestionnaire, access_token: string) {
    return this.http.put(this.url + '/update/' + cin + '?access_token=' + access_token, a );
  }




  getGestionnaireByEmail(email: string, password: string, access_token: string) {

    return this.http.get(this.url + '/get/auth/' + email + '/' + password + '?access_token=' + access_token);

  }

}
