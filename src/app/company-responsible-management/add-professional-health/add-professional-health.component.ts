import { Component, OnInit } from '@angular/core';
import {ProfessionalHealthService} from '../services/professional-health.service';
import {HealthProfessional} from '../../entities/health-professional';

@Component({
  selector: 'app-add-professional-health',
  templateUrl: './add-professional-health.component.html',
  styleUrls: ['./add-professional-health.component.css']
})
export class AddProfessionalHealthComponent implements OnInit {



  constructor(private phs: ProfessionalHealthService) { }

  ngOnInit() {
  }



  doAdd(name, address, type, select) {

    const hp: HealthProfessional = new HealthProfessional(name, address, type, true, select)
    this.phs.addHealthProfessional(hp);

  }

}
