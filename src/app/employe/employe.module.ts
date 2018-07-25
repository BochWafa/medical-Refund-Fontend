import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsutlerBulletinComponent } from './consutler-bulletin/consutler-bulletin.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import {FormsModule} from '@angular/forms';
import {InfoDialogComponent} from '../company-responsible-management/dialogs/info-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ConsutlerBulletinComponent, ReclamationComponent],
   entryComponents: [InfoDialogComponent]
})
export class EmployeModule { }
