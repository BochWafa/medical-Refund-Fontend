import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Email} from '../entities/email';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  URL_EMAIL = 'http://localhost:8080/assure/email';

  constructor(private http: HttpClient) { }


  sendEmail(email: Email, access_token: string) {

    return this.http.post(this.URL_EMAIL + '?access_token=' + access_token, email, {responseType: 'text'});
  }


}
