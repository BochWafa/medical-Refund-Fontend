import { NgModule } from '@angular/core';
import { AddAssureComponent } from './add-assure/add-assure.component';
import {HttpClientModule} from '@angular/common/http';
import {ListAssureComponent} from './list-assure/list-assure.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditAssureComponent} from './edit-assure/edit-assure.component';
import {ConsultAssureComponent} from './consult-assure/consult-assure.component';
import { AddBulletinSoinComponent } from './add-bulletin-soin/add-bulletin-soin.component';
import { ListBulletinSoinComponent } from './list-bulletin-soin/list-bulletin-soin.component';
import { ArticleMedicalComponent } from './add-bulletin-soin/article-medical/article-medical.component';
import { UpdateBulletinSoinComponent } from './update-bulletin-soin/update-bulletin-soin.component';
import { ShowBulletinComponent } from './show-bulletin/show-bulletin.component';
import {MatDialogModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddAssureComponent,
    ListAssureComponent,
    EditAssureComponent,
    ConsultAssureComponent,
    AddBulletinSoinComponent, ListBulletinSoinComponent, ArticleMedicalComponent,
    UpdateBulletinSoinComponent, ShowBulletinComponent
  ]

})
export class CompanyResponsibleManagementModule { }
