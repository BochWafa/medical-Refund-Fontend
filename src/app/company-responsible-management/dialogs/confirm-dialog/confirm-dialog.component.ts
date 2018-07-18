import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  ref: ComponentRef<ConfirmDialogComponent> ;

  sender: Subject<boolean> = new Subject<boolean>();

  title: string;
  message: string;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.ref.destroy();
  }

  confirm() {
    this.sender.next(true);
  }

}
