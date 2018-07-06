import { NgModule } from '@angular/core';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import {HttpClientModule} from '@angular/common/http';
import {ListEmployeComponent} from './list-employe/list-employe.component';
import {CommonModule} from '@angular/common';

import { AddBulletinSoinComponent } from './add-bulletin-soin/add-bulletin-soin.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [AddEmployeComponent, ListEmployeComponent, AddBulletinSoinComponent]

})
export class CompanyResponsibleManagementModule { }
