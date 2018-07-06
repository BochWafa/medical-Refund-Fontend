import { NgModule } from '@angular/core';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { AddProfessionalHealthComponent } from './add-professional-health/add-professional-health.component';
import {HttpClientModule} from '@angular/common/http';
import {ListEmployeComponent} from './list-employe/list-employe.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  declarations: [AddEmployeComponent, AddProfessionalHealthComponent, ListEmployeComponent]
})
export class CompanyResponsibleManagementModule { }
