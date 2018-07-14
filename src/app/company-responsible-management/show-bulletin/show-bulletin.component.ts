import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {AssuresService} from '../../assures.service';

@Component({
  selector: 'app-show-bulletin',
  templateUrl: './show-bulletin.component.html',
  styleUrls: ['./show-bulletin.component.css']
})
export class ShowBulletinComponent implements OnInit {

  bulletinSoin: BulletinSoin;
  assures: Array<any>;

  constructor(private route: ActivatedRoute, private service: BulletinSoinService, private assureService: AssuresService) { }

  ngOnInit() {

    this.assureService.getAll().subscribe(
      (result: Array<any>) => {
        this.assures = result;
      },
      (e) => console.log(e)
    );

    this.route.params.subscribe(
      (params) => {

        this.service.getBulletinById(params['id']).subscribe(
          (bulletin: BulletinSoin) => {
            this.bulletinSoin = bulletin;
          },
               (e) => console.log(e)
        );

      }
    );


  }





  findAssureNomByBulletinId(id: number) {

    if (this.assures !== null && this.assures !== undefined) {
  for (const a of this.assures) {

  for (const b of a.bulletinSoins) {

  if (b.id === id) {
  return a.nom;
}

}
}}

return null;
}



  findAssurePrenomByBulletinId(id: number) {
    if (this.assures !== null && this.assures !== undefined) {
    for (const a of this.assures) {

      for (const b of a.bulletinSoins) {

        if (b.id === id) {
          return a.prenom;
        }

      }
    }}

    return null;
  }


  findAssureMatriculeByBulletinId(id: number) {
    if (this.assures !== null && this.assures !== undefined) {
    for (const a of this.assures) {

      for (const b of a.bulletinSoins) {

        if (b.id === id) {
          return a.numMatricule;
        }

      }
    }}

    return null;
  }

}
