import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AssuresService } from '../../assures.service';
import { AdminsService } from '../../admins.service';
import { GestionnairesService } from '../../gestionnaires.service';
import { Assure } from '../../assure';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';
import {AccessTokenService} from '../../access-token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
cin: number;
role: string;
user: Array<any>;
mode: number;
employe: any;
  constructor( private r: ActivatedRoute,
                private as: AssuresService,
                private ads: AdminsService,
                private gs: GestionnairesService, private router: Router, private accessTokenService: AccessTokenService) {


    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.cin = this.r.snapshot.params['cin'];
        this.role = this.r.snapshot.params['role'];
        if (this.role === 'Assuré') {
          this.as.getHistory(this.cin, ato.access_token).subscribe((response: Array<Assure>) => {
            this.user = new Array<Assure>();
            this.user = response;
            this.mode = 1;
          }, error => {console.log(error); });
        } else if (this.role === 'Admin') {
          this.ads.getHistory(this.cin, ato.access_token).subscribe((response: Array<Admin>) => {
            this.user = new Array<Admin>();
            this.user = response;
            this.mode = 1;
          }, error => {console.log(error); });
        } else if (this.role === 'Gestionnaire') {
          this.gs.getHistory(this.cin, ato.access_token).subscribe((response: Array<Gestionnaire>) => {
            this.user = new Array<Gestionnaire>();
            this.user = response;
            this.mode = 1;
          }, error => {console.log(error); });
        }
      },
      (e) => console.log(e)
    );
  }
  ngOnInit() {

    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

    }

  }
  onVisualize(em) {
    this.mode = 2;
    this.employe = em;
  }


}
