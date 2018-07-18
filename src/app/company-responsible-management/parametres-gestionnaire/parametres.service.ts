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



  updateDate(dates: Array<string>) {

    return this.http.put(this.URL_UPDATE_DATE, dates, {responseType: 'text'});

  }


  getDates() {
    return this.http.get(this.URL_GET_DATES);
  }


  setDefaultDates() {
    return this.http.post(this.URL_DEFAULT_DATES, null, {responseType: 'text'});
  }



}
