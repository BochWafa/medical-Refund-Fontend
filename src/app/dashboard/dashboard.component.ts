import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    document.title = 'Cynapsys | Dashboard';
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)', { skipLocationChange: true });

  }

}
