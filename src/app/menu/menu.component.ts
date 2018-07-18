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


  listEmploye() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)', { skipLocationChange: true });
  }



  listBulletin() {

    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)', {skipLocationChange: true});


  }


  validerBulletin() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:valid-bulletin)', {skipLocationChange: true});
  }


  bordoreauList() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:bordereau-list)', {skipLocationChange: true});
  }

  bordoreauHistorique() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:bordereau-historique)', {skipLocationChange: true});
  }

  parametres() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:parametres)', {skipLocationChange: true});
  }





}
