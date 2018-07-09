import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';

@Component({
  selector: 'app-show-bulletin',
  templateUrl: './show-bulletin.component.html',
  styleUrls: ['./show-bulletin.component.css']
})
export class ShowBulletinComponent implements OnInit {

  bulletinSoin: BulletinSoin;

  constructor(private route: ActivatedRoute, private service: BulletinSoinService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {

        this.service.getBulletinById(params['id']).subscribe(
          (bulletin: BulletinSoin) => this.bulletinSoin = bulletin ,
          (e) => console.log(e)
        );

      }
    );


  }




}
