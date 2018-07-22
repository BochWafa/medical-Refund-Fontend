import {Component, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {ForgotService} from './forgot.service';
import {InfoDialogComponent} from '../company-responsible-management/dialogs/info-dialog/info-dialog.component';
import {DivDialogService} from '../company-responsible-management/dialogs/div-dialog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  entryComponents: [InfoDialogComponent]
})
export class ForgotPasswordComponent implements OnInit {

  email;

  constructor(private forgotService: ForgotService, private resolver: ComponentFactoryResolver,
              private dialogService: DivDialogService, private router: Router) { }

  ngOnInit() {
  }



  envoyer() {


    if (this.email.length > 2) {


      this.forgotService.recupererPasse(this.email).subscribe(
        (res) => {

          const factory = this.resolver.resolveComponentFactory(InfoDialogComponent);
          const dialog: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(factory);


          dialog.instance.title = 'Confirmation';
          dialog.instance.message = 'Un nouveau mot de passe vient d\'être envoyé à votre adresse email';

          dialog.instance.sender.subscribe(
            (v) => {

              dialog.destroy();
              this.router.navigateByUrl('/login');
            },
            (e) => console.log(e)
          );

        },
        (e) => console.log(e)
      );

    }


  }



}
