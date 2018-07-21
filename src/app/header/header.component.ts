import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccessTokenService} from '../access-token.service';
import {BulletinSoinService} from '../company-responsible-management/services/bulletin-soin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name;
  totale = -1;

  constructor(private router: Router, private accessTokenService: AccessTokenService, private bulletinService: BulletinSoinService) { }

  ngOnInit() {

    const admin = localStorage.getItem('admin');
    const a = JSON.parse(admin);
    if (a !== null) {
      this.name = a.prenom + ' ' + a.nom;
    }

    const gestionnaire = localStorage.getItem('gestionnaire');
    const g = JSON.parse(gestionnaire);
    if (g !== null) {
      this.name = g.prenom + ' ' + g.nom;
    }

    const assure = localStorage.getItem('assure');
    const as = JSON.parse(assure);
    if (as !== null) {
      this. name = as.prenom + ' ' + as.nom;
      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.bulletinService.getTotaleMontantByAssureId(as.id, ato.access_token).subscribe(
            (totale: number) => {
             this.totale = totale;
            },
            (e) => console.log(e)
          );
        },
        (e) => console.log(e)
      );
    }

  }





  deconnexion() {

    localStorage.setItem('admin', null);
    localStorage.setItem('assure', null);
    localStorage.setItem('gestionnaire', null);
    localStorage.setItem('type', null);

    this.router.navigateByUrl('/login');
  }



}
