import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {AssuresService} from '../../assures.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-employe',
  templateUrl: './list-assure.component.html',
  styleUrls: ['./list-assure.component.css']
})
export class ListAssureComponent implements OnInit {
employe: Assure[];
  constructor(private es: AssuresService, private route: Router) {
  }

  ngOnInit() {
    this.es.getAll().subscribe( (response: Array<Assure>) => {
      this.employe = response;
    }, error => {console.log(error);
    });
  }

  onDelete(em: Assure) {
    this.es.delete(em.id).subscribe( response => {
      this.employe.splice(this.employe.indexOf(em), 1);
    },  error1 => {console.log(error1); });
  }


onEditAssure(id: number) {
    console.log(id);
this.route.navigateByUrl('/dashboard/(dashboard-content:edit-assure/' + id + ')', {skipLocationChange: true});
}
onInfoAssure(id: number) {
  this.route.navigateByUrl('/dashboard/(dashboard-content:consult-assure/' + id + ')', {skipLocationChange: true}); }

goAddEmploye() {
    this.route.navigateByUrl('/dashboard/(dashboard-content:add-assure)', {skipLocationChange: true});
}
}
