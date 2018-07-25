import { Component, OnInit } from '@angular/core';
import {AssuresService} from '../../assures.service';
import {Assure} from '../../assure';
import {AccessTokenService} from '../../access-token.service';
import {Router} from '@angular/router';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-bordoreau-list',
  templateUrl: './bordereau-list.component.html',
  styleUrls: ['./bordereau-list.component.css']
})
export class BordereauListComponent implements OnInit {

  constructor(private assureService: AssuresService, private accessTokenService: AccessTokenService,
              private router: Router, private headerService: HeaderService) { }


  assures: Array<any>;
  assuresCopy: Array<any>;


  activateSearch() {
    this.headerService.showSearch = true;
    this.headerService.placeholder = 'Chercher par nom et prénom...';
    this.headerService.searchEvent.subscribe(
      (v) => {

        const value = this.headerService.searchText;

        if (value !== '') {
          this.assures = this.assures.filter( u => {

            const nomPrenom = u.nom + ' ' + u.prenom;
            const prenomNom = u.prenom + ' ' + u.nom;

            if (nomPrenom.toUpperCase().startsWith(value.toUpperCase()) || prenomNom.toUpperCase().startsWith(value.toUpperCase())) {
              return true;
            } else {
              return false;
            }

          });
        } else {
          this.assures = this.assuresCopy;
        }

      }
    );
  }



  ngOnInit() {


    setTimeout(() => this.activateSearch(), 500);


    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    }

    this.getAssures();

  }



  getAssures() {
    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.assureService.getAll(ato.access_token).subscribe(
          (assures: Array<any>) => {
            this.assures = assures;
            this.assuresCopy = assures;
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

  }


}
