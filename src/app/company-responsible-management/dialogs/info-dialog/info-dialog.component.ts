import {Component, ComponentRef, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  title: string;
  message: string;
  showMsg = true;

  sender: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }


  confirm() {

    this.sender.next(true);

  }

}
