import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {

  }



  afficheMenuAdmin(): boolean {
    if (JSON.parse(localStorage.getItem('admin')) !== null) {
      return true;
    } else {
      return false;
    }
  }


  afficheMenuGestionnaire(): boolean {
    if (JSON.parse(localStorage.getItem('gestionnaire')) !== null) {
      return true;
    } else {
      return false;
    }
  }


  afficheMenuAssure(): boolean {
    if (JSON.parse(localStorage.getItem('assure')) !== null) {
      return true;
    } else {
      return false;
    }
  }





  listEmploye() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)', { skipLocationChange: true });
    window.history.pushState(null, '', '/dashboard/(dashboard-content:list-user)');
  }



  listBulletin() {

    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:list-bulletin)');


  }


  validerBulletin() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:valid-bulletin)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:valid-bulletin)');
  }


  bordoreauList() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:bordereau-list)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:bordereau-list)');

  }

  bordoreauHistorique() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:bordereau-historique)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:bordereau-historique)');

  }

  parametres() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:parametres)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:parametres)');

  }


  consulter() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:consulter)');

  }

  reclamation() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:reclamation)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:reclamation)');

  }

}
