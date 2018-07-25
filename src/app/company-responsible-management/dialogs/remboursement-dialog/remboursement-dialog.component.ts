import {Component, ComponentRef, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Subject} from 'rxjs';
import * as $ from 'jquery';


@Component({
  selector: 'app-remboursement-dialog',
  templateUrl: './remboursement-dialog.component.html',
  styleUrls: ['./remboursement-dialog.component.css']
})
export class RemboursementDialogComponent implements OnInit {

  ref: ComponentRef<RemboursementDialogComponent> ;

  sender: Subject<boolean> = new Subject<boolean>();

  title: string;

  PDF;

  // ngModel
  pdf;
  montant;
  resultat;





  constructor() { }

  ngOnInit() {
  }



  close() {
    this.ref.destroy();
  }

  confirm(PDF) {

    if (this.validForm()) {
      this.PDF = PDF;
      this.close();
      this.sender.next(true);
    }

  }





  validForm() {

    if (this.motantValid() && this.PDFValid()) {
      return true;
    } else {
      return false;
    }

  }




  PDFValid() {

    if (this.pdf !== undefined) {
      const fileExtension = this.pdf.split('.').pop();
      if (fileExtension.toUpperCase() === 'PDF') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  motantValid(): boolean {

    if (this.montant !== null && this.montant >= 0 && this.montant <= 999) {
      $('#montant').removeClass('is-invalid');
      return true;
    } else {

      if (this.montant !== null && this.montant !== undefined && !this.montant.pristine) {
        $('#montant').addClass('is-invalid');
      }


      return false;
    }

  }





}
