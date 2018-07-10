import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {ListAssureComponent} from '../company-responsible-management/list-assure/list-assure.component';
import {AddProfessionalHealthComponent} from '../company-responsible-management/add-professional-health/add-professional-health.component';
import {AddAssureComponent} from '../company-responsible-management/add-assure/add-assure.component';
import {EditAssureComponent} from '../company-responsible-management/edit-assure/edit-assure.component';
import {ConsultAssureComponent} from '../company-responsible-management/consult-assure/consult-assure.component';

const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'list-assure', component: ListAssureComponent, outlet: 'dashboard-content'},
      {path: 'add-professional-health', component: AddProfessionalHealthComponent, outlet: 'dashboard-content'},
      {path: 'add-assure', component: AddAssureComponent, outlet: 'dashboard-content'} ,
      {path: 'edit-assure/:id', component: EditAssureComponent, outlet: 'dashboard-content'},
      {path: 'consult-assure/:id', component: ConsultAssureComponent, outlet: 'dashboard-content'}
    ]},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'}
];




@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
