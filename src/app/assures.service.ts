import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assure} from './assure';

@Injectable({
  providedIn: 'root'
})
export class AssuresService {
url = 'http://localhost:8080/assure';
  constructor(private http: HttpClient) { }
  addAssure(a: Assure) {
    return this.http.post(this.url + '/create', a);
  }
getAll() {
    return this.http.get(this.url + '/all');
}
<<<<<<< HEAD
delete(cin: number) {
   return this.http.delete(this.url + '/delete/' + cin);
=======


delete(id: number) {
   return this.http.delete(this.url + '/delete/' + id);
>>>>>>> b103967296e41e6e4bdd6aea93e416970a886653
}



add(assure) {
    return this.http.post(this.url + '/create', assure);
}
<<<<<<< HEAD
getHistory(cin: number) {
  return this.http.get(this.url + '/history/' + cin);
}
getAssure(cin: number) {
  return this.http.get(this.url + '/get/' + cin);
}
update(cin: number, a: Assure) {
    return this.http.put(this.url + '/update/' + cin, a );
=======


getAssure(id: number) {
  return this.http.get(this.url + '/get/' + id);
}

getAssureByCIN(cin: number) {
    return this.http.get<Assure>(this.url + '/getByCIN/' + cin);
}

update(id: number, a: Assure) {
    return this.http.put(this.url + '/update/' + id, a );
>>>>>>> b103967296e41e6e4bdd6aea93e416970a886653
}



getAssureByBulletinId(id: number) {
    return this.http.get<Assure>(this.url + '/bulletin/' + id);
}









}
