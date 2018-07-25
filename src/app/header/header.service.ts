import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  placeholder = '';
  showSearch = true;


  searchText = '';
  searchEvent: Subject<boolean> = new Subject<boolean>();


  constructor() { }





}
