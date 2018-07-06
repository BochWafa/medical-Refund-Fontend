import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ContenuComponent } from './contenu/contenu.component';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {CompanyResponsibleManagementModule} from './company-responsible-management/company-responsible-management.module';
import {HttpModule} from '@angular/http';
import {EmployesService} from './employes.service';
import { AddEmployeComponent } from './company-responsible-management/add-employe/add-employe.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContenuComponent,
    DashboardComponent,
    NotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CompanyResponsibleManagementModule,
    RouterModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [EmployesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
