import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
url = 'http://localhost:8080/employe';
  constructor(private http: HttpClient) { }

getAll() {
    return this.http.get(this.url + '/all');
}
delete(id: number) {
   return this.http.delete(this.url + '/delete/' + id);
}
}
