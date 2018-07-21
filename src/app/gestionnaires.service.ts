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
  getAll() {
    return this.http.get(this.url + '/all');
  }
  delete(cin: number, access_token: string) {
    return this.http.delete(this.url + '/delete/' + cin + '?access_token=' + access_token);
  }
  add(gestionnaire) {
    return this.http.post(this.url + '/create', gestionnaire);
  }
  getHistory(cin: number) {
    return this.http.get(this.url + '/history/' + cin);
  }
  getGestionnaire(cin: number, access_token: string) {
    return this.http.get(this.url + '/get/' + cin + '?access_token=' + access_token);
  }
  update(cin: number, a: Gestionnaire) {
    return this.http.put(this.url + '/update/' + cin, a );
  }




  getGestionnaireByEmail(email: string, password: string, access_token: string) {

    return this.http.get(this.url + '/get/auth/' + email + '/' + password + '?access_token=' + access_token);

  }

}
