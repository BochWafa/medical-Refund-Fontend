import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DateEnvoiComponent} from './date-envoi/date-envoi.component';
import {ParametresService} from './parametres.service';
import {stringify} from 'querystring';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {DivDialogService} from '../dialogs/div-dialog.service';
import {Router} from '@angular/router';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-parametres-gestionnaire',
  templateUrl: './parametres-gestionnaire.component.html',
  styleUrls: ['./parametres-gestionnaire.component.css']
})
export class ParametresGestionnaireComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container;

  datesRef: Array<ComponentRef<DateEnvoiComponent>> = new Array<ComponentRef<DateEnvoiComponent>>();

  constructor(private cfr: ComponentFactoryResolver, private paramService: ParametresService,
              private dialogservice: DivDialogService, private accessTokenService: AccessTokenService,
              private router: Router, private headerService: HeaderService) { }

  ngOnInit() {

    setTimeout(() => this.headerService.showSearch = false, 200);

    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.paramService.getDates(ato.access_token).subscribe(

          (dates: Array<string>) => {

            this.initDates(dates);

          },

          (e) => console.log(e)

        );
      },
      (e) => console.log(e)
    );


  }



  setDefaultDates() {
    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.paramService.setDefaultDates(ato.access_token).subscribe(
          (res) => {
            this.succes();
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

  }



succes() {
    const factory = this.cfr.resolveComponentFactory(InfoDialogComponent);
    const cr: ComponentRef<InfoDialogComponent> = this.dialogservice.divDialog.createComponent(factory);
    cr.instance.title = 'Confirmation mise à jour';
    cr.instance.message = 'L\'opération a été effectuer avec succés';
    cr.instance.sender.subscribe((v) => {

      cr.destroy();
      this.datesRef = new Array<ComponentRef<DateEnvoiComponent>>();
      this.container.clear();
      this.ngOnInit();
    });

}

  valider() {

    if (this.validForm()) {

      const dates = new Array<string>();

    for (const ref of this.datesRef) {

      dates.push(ref.instance.day + ';' + ref.instance.hour + ':' + ref.instance.minute);

    }
      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.paramService.updateDate(dates, ato.access_token).subscribe(
            (res) => {

              this.succes();

            },
            (e) => console.log(e)
          );
        },
        (e) => console.log(e)
      );


    }

  }


  validForm() {


    if (this.datesRef.length > 0 && this.validDays()) {
      return true;
    } else {
      return false;
    }

  }



  validDays() {

    let ok = true;

    for (const dr of this.datesRef) {


      const withoutDr = this.datesRef.filter((d) => d !== dr);


      for (const wdr of withoutDr) {

        if (wdr.instance.day.toString() === dr.instance.day.toString()) {
          ok = false;
          break;
        }

      }

    }

    return ok;
  }





addDate(day: string, hour: string, minute: string) {

    const factory = this.cfr.resolveComponentFactory(DateEnvoiComponent);
    const cr: ComponentRef<DateEnvoiComponent> = this.container.createComponent(factory);
    cr.instance.day = day;
    cr.instance.minute = minute;
    cr.instance.hour = hour;

    cr.instance.deleteEvent.subscribe((v) => {
      cr.destroy();
      const index = this.datesRef.indexOf(cr);
      this.datesRef.splice(index, 1);
    });

    this.datesRef.push(cr);

}


initDates(dates: Array<string>) {

    const datesSorted = dates.sort((a, b) => {
    if (+(a.split(';')[0]) < +(b.split(';')[0])) {
      return -1;
    } else {
      return 1;
    }

    });
    for (const d of datesSorted) {

      const day = d.split(';')[0];
      const time = d.split(';')[1];
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];

      this.addDate(day, hour, minute);
    }


}




}


