import { Component, OnInit } from '@angular/core';
import {AssuresService} from '../../assures.service';
import {Assure} from '../../assure';
import {AccessTokenService} from '../../access-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bordoreau-list',
  templateUrl: './bordereau-list.component.html',
  styleUrls: ['./bordereau-list.component.css']
})
export class BordereauListComponent implements OnInit {

  constructor(private assureService: AssuresService, private accessTokenService: AccessTokenService, private router: Router) { }


  assures: Array<any>;

  ngOnInit() {

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
          (assures: Array<any>) => this.assures = assures,
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

  }


}
