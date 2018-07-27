import {Component, ComponentRef, OnInit} from '@angular/core';
import {RemboursementDialogComponent} from '../remboursement-dialog/remboursement-dialog.component';
import {Subject} from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-refuser-remboursement',
  templateUrl: './refuser-remboursement.component.html',
  styleUrls: ['./refuser-remboursement.component.css']
})
export class RefuserRemboursementComponent implements OnInit {

  ref: ComponentRef<RefuserRemboursementComponent> ;

  sender: Subject<boolean> = new Subject<boolean>();

  title: string;


  // ngModel
  resultat;





  constructor() { }

  ngOnInit() {
  }



  close() {
    this.ref.destroy();
  }

  confirm() {

    if (this.validForm()) {
      this.close();
      this.sender.next(true);
    }

  }





  validForm() {

    if (this.resValid()) {
      return true;
    } else {
      return false;
    }

  }


  resValid() {
    if (this.resultat !== null && this.resultat !== undefined && this.resultat.length >= 20) {
      $('#resultat').removeClass('is-invalid');
      return true;
    } else {


      if (this.resultat !== undefined && !this.resultat.pristine) {
        $('#resultat').addClass('is-invalid');
      }

      return false;
    }
  }


}
