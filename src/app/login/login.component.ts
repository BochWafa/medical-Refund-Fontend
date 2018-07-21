import { Component, OnInit } from '@angular/core';
import {AccessTokenService} from '../access-token.service';
import {AssuresService} from '../assures.service';
import {AdminsService} from '../admins.service';
import {GestionnairesService} from '../gestionnaires.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hideError = true;

  // NgModel
  email;
  password;

  constructor(private accessTokenService: AccessTokenService, private assureService: AssuresService,
              private adminService: AdminsService, private gestionnaireService: GestionnairesService,
              private router: Router) { }

  ngOnInit() {

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




  auth() {

    this.accessTokenService.getAccessToken().subscribe(
      (access: any) => {
        this.assureService.getAssureByEmail(this.email, this.password, access.access_token).subscribe(
          (assure) => {
            if (assure !== null) {

            localStorage.setItem('type', 'assure');
            localStorage.setItem('assure', JSON.stringify(assure));
            this.connectAssure();

            } else {
              this.gestionnaireService.getGestionnaireByEmail(this.email, this.password, access.access_token).subscribe(
                (gestionnaire) => {
                  if (gestionnaire !== null) {
                    localStorage.setItem('type', 'gestionnaire');
                    localStorage.setItem('gestionnaire', JSON.stringify(gestionnaire));
                    this.connectGestionnaire();

                  } else {
                    this.adminService.getAdminByEmail(this.email, this.password, access.access_token).subscribe(
                      (admin) => {
                        if (admin !== null) {

                        localStorage.setItem('type', 'admin');
                        localStorage.setItem('admin', JSON.stringify(admin));
                        this.connectAdmin();

                        } else {
                          this.hideError = false;
                        }
                      },
                      (e) => console.log(e)
                    );
                  }

                },

                (e) => console.log(e)
              );
            }
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );


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
