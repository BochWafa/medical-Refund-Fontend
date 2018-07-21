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
  private URL_VALID_BULLETIN = 'http://localhost:8080/bulletin/validationBulletin/';
  private URL_GET_BY_BORDEREAU_ID = 'http://localhost:8080/bulletin/byBordereauId/';
  private URL_GET_BY_ASSURE_ID = 'http://localhost:8080/bulletin/byAssureId/';
  private URL_TOTALE_ASSURE_BY_ID = 'http://localhost:8080/bulletin/totale/';


  constructor(private http: HttpClient) { }



  sendArticlesPDF(files, access_token: string) {

    const formData = new FormData();

    for (const f of files) {
      formData.append('files', f, f.name);
    }
    return this.http.post(this.URL_ADD_ARTICLES_PDF + '?access_token=' + access_token, formData);
  }


  sendBulletinPDF(pdf, access_token: string) {

    const formData = new FormData();

    formData.append('file', pdf);

    return this.http.post(this.URL_ADD_BULLETIN_PDF + '?access_token=' + access_token, formData, {responseType: 'text'});

  }



  addBulletinSoin(bulletin: BulletinSoin, access_token: string) {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');



    return this.http.post(this.URL_ADD_BULLETIN_SOIN + '?access_token=' + access_token, bulletin, {headers: headers, responseType: 'text'});

  }


  getBulletinById(id: number, access_token: string) {
    return this.http.get<BulletinSoin>(this.URL_GET_BULLETIN_BY_ID + id + '?access_token=' + access_token);
  }

  getAllBulletins(access_token: string) {

    return this.http.get<Array<BulletinSoin>>(this.URL_GET_ALL_BULLETIN + '?access_token=' + access_token);
  }



deleteById(id: number, access_token: string) {

    return this.http.delete(this.URL_DELETE_BULLETIN + id + '?access_token=' + access_token, {responseType: 'text'});
}


validBulletin(id: number, access_token: string) {
    return this.http.get(this.URL_VALID_BULLETIN + id + '?access_token=' + access_token, {responseType: 'text'});
}


getBulletinsByBordereauId(id: number, access_token: string) {
    return this.http.get<Array<BulletinSoin>>(this.URL_GET_BY_BORDEREAU_ID + id + '?access_token=' + access_token);
}


getBulletinByAssureId(id: number, access_token: string) {

    return this.http.get(this.URL_GET_BY_ASSURE_ID + id + '?access_token=' + access_token);
}

getTotaleMontantByAssureId(id: number, access_token: string) {
    return this.http.get(this.URL_TOTALE_ASSURE_BY_ID + id + '?access_token=' + access_token);
}

}
