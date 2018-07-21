import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bordereau} from '../../entities/bordereau';

@Injectable({
  providedIn: 'root'
})
export class BordereauService {

  URL_ALL = 'http://localhost:8080/bordereau/history';

  constructor(private http: HttpClient) { }



  getAll(access_token: string) {
    return this.http.get<Array<Bordereau>>(this.URL_ALL + '?access_token=' + access_token);
  }

}
