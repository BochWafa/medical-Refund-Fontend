import { NgModule } from '@angular/core';
import { AddAssureComponent } from './add-assure/add-assure.component';
import {HttpClientModule} from '@angular/common/http';
import {ListUserComponent} from './list-user/list-user.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditAssureComponent} from './edit-assure/edit-assure.component';
import {ConsultUserComponent} from './consult-user/consult-user.component';
import { AddBulletinSoinComponent } from './add-bulletin-soin/add-bulletin-soin.component';
import { ListBulletinSoinComponent } from './list-bulletin-soin/list-bulletin-soin.component';
import { ArticleMedicalComponent } from './add-bulletin-soin/article-medical/article-medical.component';
import { UpdateBulletinSoinComponent } from './update-bulletin-soin/update-bulletin-soin.component';
import { ShowBulletinComponent } from './show-bulletin/show-bulletin.component';
import { HistoryComponent } from './history/history.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddAssureComponent,
    ListUserComponent,
    EditAssureComponent,
    ConsultUserComponent,
    AddBulletinSoinComponent, ListBulletinSoinComponent, ArticleMedicalComponent,
    UpdateBulletinSoinComponent, ShowBulletinComponent, HistoryComponent
  ]

})
export class CompanyResponsibleManagementModule { }
