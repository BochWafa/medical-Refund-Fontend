import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {ActivatedRoute} from '@angular/router';
import {AssuresService} from '../../assures.service';

@Component({
  selector: 'app-consult-assure',
  templateUrl: './consult-assure.component.html',
  styleUrls: ['./consult-assure.component.css']
})
export class ConsultAssureComponent implements OnInit {
id: number;
assure: Assure;
  constructor(private r: ActivatedRoute, private es: AssuresService) {
    this.id = this.r.snapshot.params['id'];
    this.es.getAssure(this.id).subscribe( (response: Assure) => {
      this.assure = response;
    }, error => {console.log(error); });
  }

  ngOnInit() {
  }

}
