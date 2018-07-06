import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {ListEmployeComponent} from '../company-responsible-management/list-employe/list-employe.component';
import {AddProfessionalHealthComponent} from '../company-responsible-management/add-professional-health/add-professional-health.component';
import {AddEmployeComponent} from '../company-responsible-management/add-employe/add-employe.component';

const routes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'list-employe', component: ListEmployeComponent, outlet: 'dashboard-content'},
      {path: 'add-professional-health', component: AddProfessionalHealthComponent, outlet: 'dashboard-content'},
      {path: 'add-employe', component: AddEmployeComponent, outlet: 'dashboard-content'}
    ]},
  {path: 'add-employe', component: AddEmployeComponent},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},

];




@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
