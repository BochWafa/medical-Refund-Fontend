import { NgModule } from '@angular/core';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { AddProfessionalHealthComponent } from './add-professional-health/add-professional-health.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [AddEmployeComponent, AddProfessionalHealthComponent]
})
export class CompanyResponsibleManagementModule { }
