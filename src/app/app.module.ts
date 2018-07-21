import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
import {AssuresService} from './assures.service';
import {AdminsService} from './admins.service';
import {UsersService} from './users.service';
import {GestionnairesService} from './gestionnaires.service';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {EmployeModule} from './employe/employe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContenuComponent,
    DashboardComponent,
    NotfoundComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CompanyResponsibleManagementModule,
    EmployeModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule],
  providers: [AssuresService, UsersService, GestionnairesService, AdminsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
