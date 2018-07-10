import { NgModule } from '@angular/core';
import { AddAssureComponent } from './add-assure/add-assure.component';
import { AddProfessionalHealthComponent } from './add-professional-health/add-professional-health.component';
import {HttpClientModule} from '@angular/common/http';
import {ListAssureComponent} from './list-assure/list-assure.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditAssureComponent} from './edit-assure/edit-assure.component';
import {ConsultAssureComponent} from './consult-assure/consult-assure.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddAssureComponent,
    AddProfessionalHealthComponent,
    ListAssureComponent,
    EditAssureComponent,
    ConsultAssureComponent
  ]
})
export class CompanyResponsibleManagementModule { }
