import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { AddProfessionalHealthComponent } from './add-professional-health/add-professional-health.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddEmployeComponent, AddProfessionalHealthComponent]
})
export class CompanyResponsibleManagementModule { }
