import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-date-envoi',
  templateUrl: './date-envoi.component.html',
  styleUrls: ['./date-envoi.component.css']
})
export class DateEnvoiComponent implements OnInit {

  days: Array<number> = new Array<number>();
  hours: Array<number> = new Array<number>();
  minutes: Array<number> = new Array<number>();


  day;
  hour ;
  minute;


  deleteEvent: Subject<boolean> = new Subject<boolean>();


  constructor() { }

  ngOnInit() {
    this.initDaysHoursMinutes();

  }


  initDaysHoursMinutes() {
    for (let i = 1 ; i <= 30 ; i++) {
      this.days.push(i);
    }


    for (let i = 0 ; i <= 55 ; i++) {
      this.minutes.push(i);
    }



    for (let i = 0 ; i <= 23 ; i++) {
      this.hours.push(i);
    }

  }




  delete() {
    this.deleteEvent.next(true);
  }

}
