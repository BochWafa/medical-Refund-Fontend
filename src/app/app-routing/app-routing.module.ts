import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {ListEmployeComponent} from '../company-responsible-management/list-employe/list-employe.component';
import {AddEmployeComponent} from '../company-responsible-management/add-employe/add-employe.component';
import {AddBulletinSoinComponent} from '../company-responsible-management/add-bulletin-soin/add-bulletin-soin.component';

const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'list-employe', component: ListEmployeComponent, outlet: 'dashboard-content'},

      {path: 'add-bulletin', component: AddBulletinSoinComponent, outlet: 'dashboard-content'},

      {path: 'add-employe', component: AddEmployeComponent, outlet: 'dashboard-content'}

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
