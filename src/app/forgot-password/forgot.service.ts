import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  URL_RECUPERATION = 'http://localhost:8080/assure/resetPassword/';


  constructor(private http: HttpClient) { }




  recupererPasse(email: string) {
    return this.http.get(this.URL_RECUPERATION + email, {responseType: 'text'});
  }




}
