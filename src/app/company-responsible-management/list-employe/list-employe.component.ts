import { Component, OnInit } from '@angular/core';
import {Employe} from '../../employe';
import {EmployesService} from '../../employes.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent implements OnInit {
employe: Array<Employe>;
  constructor(private es: EmployesService) { }

  ngOnInit() {
    this.es.getAll().subscribe( response => {
      this.employe = response.json();
    }, error => {console.log(error);
    });
  }

  onDelete(em: Employe) {
    this.es.delete(em.idAssuranceUser).subscribe( response => {
      this.employe.splice(this.employe.indexOf(em), 1);
    },  error1 => {console.log(error1); });
  }


onEdit(id: number) {}
onInfo(id: number) {}
}
