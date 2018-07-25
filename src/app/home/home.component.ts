import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    document.title = 'Cynapsys | Accueil';


    const type = localStorage.getItem('type');

    if (type !== null) {
      if (type === 'admin') {
        this.connectAdmin();
      } else if (type === 'gestionnaire') {
        this.connectGestionnaire();
      } else if (type === 'assure') {
        this.connectAssure();
      }
    }


  }




  connectAdmin() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)');
  }

  connectGestionnaire() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

  }


  connectAssure() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
  }



}
