import { NgModule } from '@angular/core';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import {HttpClientModule} from '@angular/common/http';
import {ListEmployeComponent} from './list-employe/list-employe.component';
import {CommonModule} from '@angular/common';

import { AddBulletinSoinComponent } from './add-bulletin-soin/add-bulletin-soin.component';
import { ListBulletinSoinComponent } from './list-bulletin-soin/list-bulletin-soin.component';
import { ArticleMedicalComponent } from './add-bulletin-soin/article-medical/article-medical.component';
import {FormsModule} from '@angular/forms';
import { UpdateBulletinSoinComponent } from './update-bulletin-soin/update-bulletin-soin.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [AddEmployeComponent, ListEmployeComponent, AddBulletinSoinComponent, ListBulletinSoinComponent, ArticleMedicalComponent, UpdateBulletinSoinComponent]

})
export class CompanyResponsibleManagementModule { }
