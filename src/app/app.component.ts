import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DivDialogService} from './company-responsible-management/dialogs/div-dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('dialog', {read: ViewContainerRef}) dialog;

  constructor(private divDialogService: DivDialogService) {}

  ngOnInit(): void {
    this.divDialogService.divDialog = this.dialog;
  }



}
