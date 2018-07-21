import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor() { }

  ngOnInit() {

    document.title = 'Cynapsys | Dashboard';

  }

}
