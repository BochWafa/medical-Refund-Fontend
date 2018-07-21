import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BulletinSoinService} from '../../company-responsible-management/services/bulletin-soin.service';
import {AccessTokenService} from '../../access-token.service';
import {BulletinSoin} from '../../entities/bulletin-soin';

@Component({
  selector: 'app-consutler-bulletin',
  templateUrl: './consutler-bulletin.component.html',
  styleUrls: ['./consutler-bulletin.component.css']
})
export class ConsutlerBulletinComponent implements OnInit {

  bulletins: Array<BulletinSoin>;
  assure;

  constructor(private router: Router, private bulletinService: BulletinSoinService, private accessTokenService: AccessTokenService) { }

  ngOnInit() {

    const type = localStorage.getItem('type');

    if (type === 'admin') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)');
    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

    }

    this.assure = JSON.parse(localStorage.getItem('assure'));

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.bulletinService.getBulletinByAssureId(this.assure.id, ato.access_token).subscribe(
          (bulletins: Array<BulletinSoin>) => {
            this.bulletins = bulletins;
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );




  }





  onInfo(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:show-bulletin/' + id + ')', {skipLocationChange: true});
  }



}
