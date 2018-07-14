import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assure} from './assure';

@Injectable({
  providedIn: 'root'
})
export class AssuresService {
url = 'http://localhost:8080/employe';
  constructor(private http: HttpClient) { }

getAll() {
    return this.http.get(this.url + '/all');
}


delete(id: number) {
   return this.http.delete(this.url + '/delete/' + id);
}



add(assure) {
    return this.http.post(this.url + '/create', assure);
}


getAssure(id: number) {
  return this.http.get(this.url + '/get/' + id);
}

getAssureByCIN(cin: number) {
    return this.http.get<Assure>(this.url + '/getByCIN/' + cin);
}

update(id: number, a: Assure) {
    return this.http.put(this.url + '/update/' + id, a );
}



getAssureByBulletinId(id: number) {
    return this.http.get<Assure>(this.url + '/bulletin/' + id);
}









}
