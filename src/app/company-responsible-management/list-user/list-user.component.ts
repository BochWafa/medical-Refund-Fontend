import {Component, OnInit, Sanitizer} from '@angular/core';
import {Assure} from '../../assure';
import {Router} from '@angular/router';
import {User} from '../../user';
import {UsersService} from '../../users.service';
import { AssuresService } from '../../assures.service';
import { AdminsService } from '../../admins.service';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';
import { GestionnairesService } from '../../gestionnaires.service';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-add-employe',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

usersCopy: Array<User>;
users: Array<User>;
a: Assure;
ad: Admin;
g: Gestionnaire;
  constructor(private us: UsersService,
              private route: Router,
            private ass: AssuresService,
          private ads: AdminsService,
        private gs: GestionnairesService, private accessTokenService: AccessTokenService, private router: Router,
              public headerService: HeaderService) {}



  excel() {

  localStorage.setItem('excel', JSON.stringify(this.users));
    localStorage.setItem('excelType', 'user');


  }


  activateSearch() {
    this.headerService.showSearch = true;
    this.headerService.placeholder = 'Chercher par nom et prénom...';
    this.headerService.searchEvent.subscribe(
      (v) => {

        const value = this.headerService.searchText;

        if (value !== '') {
          this.users = this.users.filter( u => {

            const nomPrenom = u.nom + ' ' + u.prenom;
            const prenomNom = u.prenom + ' ' + u.nom;

              if (nomPrenom.toUpperCase().startsWith(value.toUpperCase()) || prenomNom.toUpperCase().startsWith(value.toUpperCase())) {
                return true;
              } else {
                return false;
              }

          });
        } else {
          this.users = this.usersCopy;
        }

      }
    );
  }




  ngOnInit() {


  setTimeout(() => this.activateSearch(), 500);


    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

    }

    this.users = new Array<User>();
    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.us.getAll(ato.access_token).subscribe( (response: Array<User>) => {
          this.users = response;
          this.usersCopy = response;
          console.log(this.users.length);
        }, error1 => console.log(error1));
      },
      (e) => console.log(e)
    );

  }
  onDeleteUser(em: User) {
    if (em.role === 'Assuré') {
      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.ass.getAssure(em.cin, ato.access_token).subscribe ((response: Assure) => {
            this.a = response;
            this.ass.delete(this.a.cin, ato.access_token).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                1
              );
            }, error => {console.log(error); });
          }, error => { console.log(error); });
        },
        (e) => console.log(e)

      );

    } else if (em.role === 'Admin') {
      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.ads.getAdmin(em.cin, ato.access_token).subscribe ((response: Admin) => {
            this.ad = response;
            this.ads.delete(this.ad.cin, ato.access_token).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                1
              );
            }, error => {console.log(error); });
          }, error => { console.log(error); });
        },
        (e) => console.log(e)
      );

    } else if (em.role === 'Gestionnaire' ) {
      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.gs.getGestionnaire(em.cin, ato.access_token).subscribe ((response: Gestionnaire) => {
            this.g = response;
            this.gs.delete(this.g.cin, ato.access_token).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                1
              );
            }, error => {console.log(error); });
          }, error => { console.log(error); });
        },
        (e) => console.log(e)
      );

  }}

onEditUser(em: User) {
this.route.navigateByUrl('/dashboard/(dashboard-content:edit-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
  window.history.pushState(null, '', '/dashboard/(dashboard-content:edit-user/' + em.cin + '/' + em.role + ')');

}
onInfoUser(em: User) {
    this.route.navigateByUrl('/dashboard/(dashboard-content:consult-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
  window.history.pushState(null, '', '/dashboard/(dashboard-content:consult-user/' + em.cin + '/' + em.role + ')');

}
goAddEmploye() {
    this.route.navigateByUrl('/dashboard/(dashboard-content:add-assure)', {skipLocationChange: true});
  window.history.pushState(null, '', '/dashboard/(dashboard-content:add-assure)');

}
onHistoryUser(em: User) {
  this.route.navigateByUrl('/dashboard/(dashboard-content:history-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
  window.history.pushState(null, '', '/dashboard/(dashboard-content:history-user/' + em.cin + '/' + em.role + ')');

}
}
