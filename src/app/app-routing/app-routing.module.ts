import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {ListAssureComponent} from '../company-responsible-management/list-assure/list-assure.component';
import {AddAssureComponent} from '../company-responsible-management/add-assure/add-assure.component';
import {EditAssureComponent} from '../company-responsible-management/edit-assure/edit-assure.component';
import {ConsultAssureComponent} from '../company-responsible-management/consult-assure/consult-assure.component';
import {AddBulletinSoinComponent} from '../company-responsible-management/add-bulletin-soin/add-bulletin-soin.component';
import {ListBulletinSoinComponent} from '../company-responsible-management/list-bulletin-soin/list-bulletin-soin.component';
import {UpdateBulletinSoinComponent} from '../company-responsible-management/update-bulletin-soin/update-bulletin-soin.component';
import {ShowBulletinComponent} from '../company-responsible-management/show-bulletin/show-bulletin.component';
const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'list-assure', component: ListAssureComponent, outlet: 'dashboard-content'},
      {path: 'add-assure', component: AddAssureComponent, outlet: 'dashboard-content'} ,
      {path: 'edit-assure/:id', component: EditAssureComponent, outlet: 'dashboard-content'},
      {path: 'consult-assure/:id', component: ConsultAssureComponent, outlet: 'dashboard-content'},
      {path: 'list-bulletin', component: ListBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'update-bulletin/:id', component: UpdateBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'add-bulletin', component: AddBulletinSoinComponent, outlet: 'dashboard-content'},
      {path: 'show-bulletin/:id', component: ShowBulletinComponent, outlet: 'dashboard-content'}

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
