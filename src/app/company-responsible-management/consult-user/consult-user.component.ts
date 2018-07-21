import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {ActivatedRoute, Router} from '@angular/router';
import {AssuresService} from '../../assures.service';
import { UsersService } from '../../users.service';
import { AdminsService } from '../../admins.service';
import { GestionnairesService } from '../../gestionnaires.service';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';
import {AccessTokenService} from '../../access-token.service';

@Component({
  selector: 'app-user-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.css']
})
export class ConsultUserComponent implements OnInit {
cin: number;
role: string;
assure: any;
  constructor(private r: ActivatedRoute,
     private as: AssuresService,
      private ads: AdminsService,
      private gs: GestionnairesService, private accessTokenService: AccessTokenService, private router: Router) {
    this.cin = this.r.snapshot.params['cin'];
    this.role = this.r.snapshot.params['role'];

        if (this.role === 'Assuré') {
          this.accessTokenService.getAccessToken().subscribe(
            (ato: any) => {
              this.as.getAssure(this.cin, ato.access_token).subscribe ((response: Assure) => {
                this.assure = new Assure();
                this.assure = response;
                console.log(this.assure);
              }, error => {console.log(error); });
            },
            (e) => console.log(e)
          );


        } else if (this.role === 'Admin') {

          this.accessTokenService.getAccessToken().subscribe(
            (ato: any) => {

              this.ads.getAdmin(this.cin, ato.access_token).subscribe ((response: Admin) => {
                this.assure = new Admin();
                this.assure = response;
              }, error => {console.log(error); });
            },
            (e) => console.log(e)
          );

        } else if (this.role === 'Gestionnaire') {

          this.accessTokenService.getAccessToken().subscribe(
            (ato: any) => {
              this.gs.getGestionnaire(this.cin, ato.access_token).subscribe ((response: Gestionnaire) => {
                this.assure = new Gestionnaire();
                this.assure = response;
              }, error => {console.log(error); });
            },
            (e) => console.log(e)
          );

        }
  }

  ngOnInit() {
    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

    }

  }

}
