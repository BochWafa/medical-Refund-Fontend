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
getAll(access_token: string) {
    return this.http.get(this.url + '/all?access_token=' + access_token);
}
<<<<<<< HEAD
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
=======

delete(cin: number, access_token: string) {
  return this.http.delete(this.url + '/delete/' + cin + '?access_token=' + access_token);
}



add(assure, access_token: string) {
    return this.http.post(this.url + '/create?access_token=' + access_token, assure);
>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c
}
getHistory(cin: number) {
  return this.http.get(this.url + '/history/' + cin);
}
getAssure(cin: number, access_token: string) {
  return this.http.get(this.url + '/get/' + cin + '?access_token=' + access_token);
}



getAssureByCIN(cin: number, access_token: string) {
    return this.http.get<Assure>(this.url + '/getByCIN/' + cin + '?access_token=' + access_token);
}

update(id: number, a: Assure) {
    return this.http.put(this.url + '/update/' + id, a );
}



getAssureByBulletinId(id: number, access_token: string) {
    return this.http.get<Assure>(this.url + '/bulletin/' + id + '?access_token=' + access_token);
}




getAssureByEmail(email: string, password: string, access_token: string) {
  return this.http.get(this.url + '/get/auth/' + email + '/' + password + '?access_token=' + access_token);
}







}
