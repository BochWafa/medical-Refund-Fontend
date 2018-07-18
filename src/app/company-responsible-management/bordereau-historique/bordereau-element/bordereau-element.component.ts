import { Component, OnInit } from '@angular/core';
import {BulletinSoin} from '../../../entities/bulletin-soin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bordereau-element',
  templateUrl: './bordereau-element.component.html',
  styleUrls: ['./bordereau-element.component.css']
})
export class BordereauElementComponent implements OnInit {

    bulletins: Array<BulletinSoin>;
    dateEnvoi: Date;
    assures: Array<any>;

    affiche = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  changeState() {
    this.affiche = !this.affiche;
  }

  onInfo(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:show-bulletin/' + id + ')', {skipLocationChange: true});
  }

  findAssureCinByBulletinId(id: number) {

    if (this.assures !== null && this.assures !== undefined) {
      for (const a of this.assures) {

        for (const b of a.bulletinSoins) {

          if (b.id === id) {
            return a.cin;
          }

        }
      }
    }

    return null;
  }


}
