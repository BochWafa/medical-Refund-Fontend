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
<<<<<<< HEAD
import { HistoryComponent } from './history/history.component';
=======
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';



>>>>>>> b103967296e41e6e4bdd6aea93e416970a886653
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddAssureComponent,
    ListUserComponent,
=======
  FormsModule,
    ReactiveFormsModule
  ],

  entryComponents: [ConfirmDialogComponent, InfoDialogComponent],

  declarations: [
    AddAssureComponent,
    ListAssureComponent,
>>>>>>> b103967296e41e6e4bdd6aea93e416970a886653
    EditAssureComponent,
    ConsultUserComponent,
    AddBulletinSoinComponent, ListBulletinSoinComponent, ArticleMedicalComponent,
<<<<<<< HEAD
    UpdateBulletinSoinComponent, ShowBulletinComponent, HistoryComponent
=======
    UpdateBulletinSoinComponent, ShowBulletinComponent, ConfirmDialogComponent, InfoDialogComponent
>>>>>>> b103967296e41e6e4bdd6aea93e416970a886653
  ]


})
export class CompanyResponsibleManagementModule { }
