import { Component, OnInit } from '@angular/core';
import {AssuresService} from '../../assures.service';
import {Assure} from '../../assure';

@Component({
  selector: 'app-bordoreau-list',
  templateUrl: './bordereau-list.component.html',
  styleUrls: ['./bordereau-list.component.css']
})
export class BordereauListComponent implements OnInit {

  constructor(private assureService: AssuresService) { }


  assures: Array<any>;

  ngOnInit() {

    this.getAssures();

  }



  getAssures() {
    this.assureService.getAll().subscribe(
      (assures: Array<any>) => this.assures = assures,
      (e) => console.log(e)
    );
  }


}
