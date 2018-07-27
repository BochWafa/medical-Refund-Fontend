import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {Assure} from '../../assure';
import {AssuresService} from '../../assures.service';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-list-bulletin-soin',
  templateUrl: './list-bulletin-soin.component.html',
  styleUrls: ['./list-bulletin-soin.component.css']
})
export class ListBulletinSoinComponent implements OnInit {


  bulletins: Array<BulletinSoin>;
  bulletinsCopy: Array<BulletinSoin>;
  assures: Array<any>;

  constructor(private router: Router, private bulletinSoinService: BulletinSoinService, private assureService: AssuresService,
              private accessTokenService: AccessTokenService, private headerService: HeaderService) { }



  activateSearch() {
    this.headerService.showSearch = true;
    this.headerService.placeholder = 'Chercher par Numéro CIN...';
    this.headerService.searchEvent.subscribe(
      (v) => {

        const value = this.headerService.searchText;

        if (value !== '') {
          this.bulletins = this.bulletins.filter( u => {

            const cin =  this.findAssureCinByBulletinId(u.id) + '';

            if (cin.startsWith(value)) {
              return true;
            } else {
              return false;
            }

          });
        } else {
          this.bulletins = this.bulletinsCopy;
        }

      }
    );
  }


  excel() {

    localStorage.setItem('excel', JSON.stringify(this.bulletins));
    localStorage.setItem('excelType', 'soin');

  }


  ngOnInit() {


    setTimeout(() => this.activateSearch(), 500);


    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.bulletinSoinService.getAllBulletins(ato.access_token).subscribe(
          (result: Array<BulletinSoin>) => {
            this.bulletins = result;
            this.bulletinsCopy = result;
          },
          (e) => console.log(e)
        );

        this.assureService.getAll(ato.access_token).subscribe(
          (result: Array<any>) => {
            this.assures = result;
          },
          (e) => console.log(e)
        );

      },
      (e) => console.log(e)
    );




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

  goAddBulletinSoin() {

    this.router.navigateByUrl('/dashboard/(dashboard-content:add-bulletin)', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:add-bulletin)');

  }


  onInfo(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:show-bulletin/' + id + ')', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:show-bulletin/' + id + ')');

  }

  onEdit(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:update-bulletin/' + id + ')', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:update-bulletin/' + id + ')');

  }


  onDelete(id) {

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.bulletinSoinService.deleteById(id, ato.access_token).subscribe(

          (res: string) => {

            this.bulletins = this.bulletins.filter((b) => b.id !== id);
          },
          (e) => console.log(e)

        );
      },
      (e) => console.log(e)
    );


  }

}
