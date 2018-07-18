import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {ActivatedRoute} from '@angular/router';
import {AssuresService} from '../../assures.service';
import { UsersService } from '../../users.service';
import { AdminsService } from '../../admins.service';
import { GestionnairesService } from '../../gestionnaires.service';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';

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
      private gs: GestionnairesService) {
    this.cin = this.r.snapshot.params['cin'];
    this.role = this.r.snapshot.params['role'];     
        if (this.role === 'Assuré') {
            this.as.getAssure(this.cin).subscribe ((response: Assure) => {
                this.assure = new Assure();
                this.assure = response;
                console.log(this.assure);
            }, error => {console.log(error); });
        } else if (this.role === 'Admin') {
          this.ads.getAdmin(this.cin).subscribe ((response: Admin) => {
           this.assure = new Admin();
            this.assure = response;
        }, error => {console.log(error); });
        } else if (this.role === 'Gestionnaire') {
          this.gs.getGestionnaire(this.cin).subscribe ((response: Gestionnaire) => {
            this.assure = new Gestionnaire();
            this.assure = response;
        }, error => {console.log(error); });
        }
  }

  ngOnInit() {
  }

}
