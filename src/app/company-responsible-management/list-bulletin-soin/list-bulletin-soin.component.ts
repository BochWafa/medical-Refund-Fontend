import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {BulletinSoinService} from '../services/bulletin-soin.service';

@Component({
  selector: 'app-list-bulletin-soin',
  templateUrl: './list-bulletin-soin.component.html',
  styleUrls: ['./list-bulletin-soin.component.css']
})
export class ListBulletinSoinComponent implements OnInit {


  bulletins: Array<BulletinSoin>;

  constructor(private router: Router, private bulletinSoinService: BulletinSoinService) { }

  ngOnInit() {

    this.bulletinSoinService.getAllBulletins().subscribe(
      (result: Array<BulletinSoin>) => this.bulletins = result,
      (e) => console.log(e)
    );

  }



  goAddBulletinSoin() {

    this.router.navigateByUrl('/dashboard/(dashboard-content:add-bulletin)', {skipLocationChange: true});

  }


  onInfo(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:show-bulletin/' + id + ')', {skipLocationChange: true});
  }

  onEdit(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:update-bulletin/' + id + ')', {skipLocationChange: true});
  }


  onDelete(id) {

    this.bulletinSoinService.deleteById(id).subscribe(

      (res: string) => {

        this.bulletins = this.bulletins.filter((b) => b.id !== id);
      },
      (e) => console.log(e)

    );

  }

}
