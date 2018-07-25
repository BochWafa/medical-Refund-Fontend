import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assure} from './assure';

@Injectable({
  providedIn: 'root'
})
export class AssuresService {
url = 'http://localhost:8080/assure';
private URL_ADD_FICHE_AFF_PDF = 'http://localhost:8080/assure/uploadAffFile';

  constructor(private http: HttpClient) { }
  addAssure(a: Assure) {
    return this.http.post(this.url + '/create', a);
  }
getAll() {
    return this.http.get(this.url + '/all');
}
sendMail(cin: number) {
  return this.http.get(this.url + '/sendmail/' + cin);
}
delete(cin: number) {
  return this.http.delete(this.url + '/delete/' + cin);
}

sendAffFilePDF(pdf) {
  const formData = new FormData();
  formData.append('file', pdf);
  return this.http.post(this.URL_ADD_FICHE_AFF_PDF, formData, {responseType: 'text'});
}
add(assure) {
    return this.http.post(this.url + '/create', assure);
}
getHistory(cin: number) {
  return this.http.get(this.url + '/history/' + cin);
}
getAssure(cin: number) {
  return this.http.get(this.url + '/get/' + cin);
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
