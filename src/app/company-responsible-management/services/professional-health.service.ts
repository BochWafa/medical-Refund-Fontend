import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HealthProfessional} from '../../entities/health-professional';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalHealthService {

   URL = 'http://localhost:8080/addHealthProfessional';


  constructor(private http: HttpClient) { }



  addHealthProfessional(hp: HealthProfessional) {


    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.post(this.URL, hp, { headers: headers}).subscribe(
      (a) => alert('hhhhh'),
      (e) => console.log('error')
    );

  }

}
