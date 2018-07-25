import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssuresService } from '../../assures.service';
import { AdminsService } from '../../admins.service';
import { GestionnairesService } from '../../gestionnaires.service';
import { Assure } from '../../assure';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';

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
                private gs: GestionnairesService) {
    this.cin = this.r.snapshot.params['cin'];
    this.role = this.r.snapshot.params['role'];
      if (this.role === 'Assuré') {
          this.as.getHistory(this.cin).subscribe((response: Array<Assure>) => {
            this.user = new Array<Assure>();
            this.user = response;
            this.mode = 1;
          }, error => {console.log(error); });
      } else if (this.role === 'Admin') {
        this.ads.getHistory(this.cin).subscribe((response: Array<Admin>) => {
          this.user = new Array<Admin>();
          this.user = response;
          this.mode = 1;
        }, error => {console.log(error); });
      } else if (this.role === 'Gestionnaire') {
        this.gs.getHistory(this.cin).subscribe((response: Array<Gestionnaire>) => {
          this.user = new Array<Gestionnaire>();
          this.user = response;
          this.mode = 1;
        }, error => {console.log(error); });
      }
  }
  ngOnInit() {
  }
  onVisualize(em) {
    this.mode = 2;
    this.employe = em;
    console.log("okkk");
  }


}
