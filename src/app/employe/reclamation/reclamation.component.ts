import {Component, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {AccessTokenService} from '../../access-token.service';
import {EmployeService} from '../employe.service';
import {Email} from '../../entities/email';
import {DivDialogService} from '../../company-responsible-management/dialogs/div-dialog.service';
import {InfoDialogComponent} from '../../company-responsible-management/dialogs/info-dialog/info-dialog.component';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  sender = '';
  destinationEmail = 'ghazivdlz07@gmail.com';

  // ngModel
  objet;
  message;

  constructor(private router: Router, private accessTokenService: AccessTokenService,
                private employeService: EmployeService, private dialogService: DivDialogService,
                private resolver: ComponentFactoryResolver, private headerService: HeaderService) { }

  ngOnInit() {

    setTimeout(() => this.headerService.showShow = false, 200);


    const assure = JSON.parse(localStorage.getItem('assure'));
    this.sender = 'CIN : ' + assure.cin + ' / Nom et Prénom : ' + assure.nom + ' ' + assure.prenom;

    const type = localStorage.getItem('type');

    if (type === 'admin') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:list-user)');

    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:list-bulletin)');
    }
  }


  annuler() {
    this.objet = undefined;
    this.message = undefined;
  }

  evoyer() {

    const email = new Email(this.objet, this.message, this.sender, this.destinationEmail);

    const factory = this.resolver.resolveComponentFactory(InfoDialogComponent);
    const dialog: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(factory);
    dialog.instance.title = 'Confirmation';
    dialog.instance.showMsg = false;

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.employeService.sendEmail(email, ato.access_token).subscribe(
          (res) => {

            dialog.instance.message = 'Votre email a été envoyé avec succés';
            dialog.instance.showMsg = true;
            dialog.instance.sender.subscribe((v) => {
              dialog.destroy();
              this.annuler();

            });



          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

  }


  validForm() {

    if (this.objet !== null && this.objet !== undefined && this.objet.length > 0 &&
          this.message !== null && this.message !== undefined && this.message.length > 4 ) {
      return true;
    } else {
      return false;
    }

  }
}
