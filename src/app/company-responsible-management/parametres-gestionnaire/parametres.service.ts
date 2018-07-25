import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

    private URL_UPDATE_DATE = 'http://localhost:8080/bulletin/updateDateConfig';
    private URL_GET_DATES = 'http://localhost:8080/bulletin/getDateConfig';
    private URL_DEFAULT_DATES = 'http://localhost:8080/bulletin/defaultDateConfig';


  constructor(private http: HttpClient) { }



  updateDate(dates: Array<string>, access_token: string) {

    return this.http.put(this.URL_UPDATE_DATE + '?access_token=' + access_token, dates, {responseType: 'text'});

  }


  getDates(access_token: string) {
    return this.http.get(this.URL_GET_DATES + '?access_token=' + access_token);
  }


  setDefaultDates(access_token: string) {
    return this.http.post(this.URL_DEFAULT_DATES + '?access_token=' + access_token, null, {responseType: 'text'});
  }



}
