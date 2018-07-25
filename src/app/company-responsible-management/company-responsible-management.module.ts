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
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import { BordereauListComponent } from './bordoreau-list/bordereau-list.component';
import { ParametresGestionnaireComponent } from './parametres-gestionnaire/parametres-gestionnaire.component';
import { DateEnvoiComponent } from './parametres-gestionnaire/date-envoi/date-envoi.component';
import { ValidationBulletinComponent } from './validation-bulletin/validation-bulletin.component';
import { BordereauHistoriqueComponent } from './bordereau-historique/bordereau-historique.component';
import { BordereauElementComponent } from './bordereau-historique/bordereau-element/bordereau-element.component';
import { ExcelComponent } from './list-user/excel/excel.component';
import { RemboursementDialogComponent } from './dialogs/remboursement-dialog/remboursement-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  entryComponents: [ConfirmDialogComponent, InfoDialogComponent, DateEnvoiComponent, BordereauElementComponent,
    RemboursementDialogComponent],

  declarations: [
    AddAssureComponent,
    EditAssureComponent,
    ConsultUserComponent,
    AddBulletinSoinComponent, ListBulletinSoinComponent, ArticleMedicalComponent,
    UpdateBulletinSoinComponent, ShowBulletinComponent, ConfirmDialogComponent, InfoDialogComponent,
    BordereauListComponent, ParametresGestionnaireComponent, DateEnvoiComponent, ValidationBulletinComponent,
    BordereauHistoriqueComponent, BordereauElementComponent, HistoryComponent, ListUserComponent, ExcelComponent,
    RemboursementDialogComponent
  ]


})
export class CompanyResponsibleManagementModule { }
