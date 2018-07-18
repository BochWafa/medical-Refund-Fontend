import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from './Admin';
import {Gestionnaire} from './Gestionnaire';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesService {

  url = 'http://localhost:8080/gestionnaire';
  constructor(private http: HttpClient) { }
  addGestionnaire(a: Gestionnaire) {
    return this.http.post(this.url + '/create', a);
  }
  getAll() {
    return this.http.get(this.url + '/all');
  }
  delete(cin: number) {
    return this.http.delete(this.url + '/delete/' + cin);
  }
  add(gestionnaire) {
    return this.http.post(this.url + '/create', gestionnaire);
  }
  getHistory(cin: number) {
    return this.http.get(this.url + '/history/' + cin);
  }
  getGestionnaire(cin: number) {
    return this.http.get(this.url + '/get/' + cin);
  }
  update(cin: number, a: Gestionnaire) {
    return this.http.put(this.url + '/update/' + cin, a );
  }
}
