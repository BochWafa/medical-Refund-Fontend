import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {ListUserComponent} from '../company-responsible-management/list-user/list-user.component';
import {AddAssureComponent} from '../company-responsible-management/add-assure/add-assure.component';
import {EditAssureComponent} from '../company-responsible-management/edit-assure/edit-assure.component';
import {ConsultUserComponent} from '../company-responsible-management/consult-user/consult-user.component';
import {AddBulletinSoinComponent} from '../company-responsible-management/add-bulletin-soin/add-bulletin-soin.component';
import {ListBulletinSoinComponent} from '../company-responsible-management/list-bulletin-soin/list-bulletin-soin.component';
import {UpdateBulletinSoinComponent} from '../company-responsible-management/update-bulletin-soin/update-bulletin-soin.component';
import {ShowBulletinComponent} from '../company-responsible-management/show-bulletin/show-bulletin.component';
import {BordereauListComponent} from '../company-responsible-management/bordoreau-list/bordereau-list.component';
import {ParametresGestionnaireComponent} from '../company-responsible-management/parametres-gestionnaire/parametres-gestionnaire.component';
import {ValidationBulletinComponent} from '../company-responsible-management/validation-bulletin/validation-bulletin.component';
import {BordereauHistoriqueComponent} from '../company-responsible-management/bordereau-historique/bordereau-historique.component';
import { HistoryComponent } from '../company-responsible-management/history/history.component';


const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'list-user', component: ListUserComponent, outlet: 'dashboard-content'},
      {path: 'add-assure', component: AddAssureComponent, outlet: 'dashboard-content'} ,
      {path: 'edit-user/:cin/:role', component: EditAssureComponent, outlet: 'dashboard-content'},
      {path: 'consult-user/:cin/:role', component: ConsultUserComponent, outlet: 'dashboard-content'},
      {path: 'history-user/:cin/:role', component: HistoryComponent, outlet: 'dashboard-content'},
      {path: 'list-bulletin', component: ListBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'update-bulletin/:id', component: UpdateBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'add-bulletin', component: AddBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'show-bulletin/:id', component: ShowBulletinComponent, outlet: 'dashboard-content'},
      {path: 'valid-bulletin', component: ValidationBulletinComponent, outlet: 'dashboard-content'},
      {path: 'bordereau-list', component: BordereauListComponent, outlet: 'dashboard-content'},
      {path: 'bordereau-historique', component: BordereauHistoriqueComponent, outlet: 'dashboard-content'},
      {path: 'parametres', component: ParametresGestionnaireComponent, outlet: 'dashboard-content'}

    ]},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}

];
@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
