import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {ArticleMedical} from '../../entities/article-medical';

@Injectable({
  providedIn: 'root'
})
export class BulletinSoinService {

  private URL_ADD_BULLETIN_PDF = 'http://localhost:8080/bulletin/uploadBulletinFile';
  private URL_ADD_ARTICLES_PDF = 'http://localhost:8080/bulletin/uploadArticlesFile';
  private URL_ADD_BULLETIN_SOIN = 'http://localhost:8080/bulletin/add-bulletin';
  private URL_GET_ALL_BULLETIN = 'http://localhost:8080/bulletin/all';
  private URL_GET_BULLETIN_BY_ID = 'http://localhost:8080/bulletin/';
  private URL_DELETE_BULLETIN = 'http://localhost:8080/bulletin/delete/';
  private URL_DELETE_ARTICLE = 'http://localhost:8080/bulletin/delete/article/';


  constructor(private http: HttpClient) { }



  sendArticlesPDF(files) {

    const formData = new FormData();

    for (const f of files) {
      formData.append('files', f, f.name);
    }
    return this.http.post(this.URL_ADD_ARTICLES_PDF, formData, {responseType: 'text'});
  }


  sendBulletinPDF(pdf) {

    const formData = new FormData();

    formData.append('file', pdf);

    return this.http.post(this.URL_ADD_BULLETIN_PDF, formData, {responseType: 'text'});

  }



  addBulletinSoin(bulletin: BulletinSoin) {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');



    return this.http.post(this.URL_ADD_BULLETIN_SOIN, bulletin, {headers: headers, responseType: 'text'});

  }


  getBulletinById(id: number) {
    return this.http.get<BulletinSoin>(this.URL_GET_BULLETIN_BY_ID + id);
  }

  getAllBulletins() {

    return this.http.get<Array<BulletinSoin>>(this.URL_GET_ALL_BULLETIN);
  }



deleteById(id: number) {

    return this.http.delete(this.URL_DELETE_BULLETIN + id, {responseType: 'text'});
}

  deleteArticleById(id: number) {

    return this.http.delete(this.URL_DELETE_ARTICLE + id, {responseType: 'text'});
  }


}
