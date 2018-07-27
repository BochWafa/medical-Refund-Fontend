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


  title = 0;


  showShow = false;

  constructor() { }





}
