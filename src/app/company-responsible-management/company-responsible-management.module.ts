import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { AddProfessionalHealthComponent } from './add-professional-health/add-professional-health.component';
import {AddEmployeComponent} from './add-employe/add-employe.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListEmployeComponent, AddProfessionalHealthComponent, AddEmployeComponent]
})
export class CompanyResponsibleManagementModule { }
