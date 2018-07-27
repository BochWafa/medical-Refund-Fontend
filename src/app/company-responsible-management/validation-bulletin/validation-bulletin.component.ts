import {Component, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {AssuresService} from '../../assures.service';
import {Router} from '@angular/router';
import {DivDialogService} from '../dialogs/div-dialog.service';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';
import {RemboursementDialogComponent} from '../dialogs/remboursement-dialog/remboursement-dialog.component';
import {RefuserRemboursementComponent} from '../dialogs/refuser-remboursement/refuser-remboursement.component';

@Component({
  selector: 'app-validation-bulletin',
  templateUrl: './validation-bulletin.component.html',
  styleUrls: ['./validation-bulletin.component.css']
})
export class ValidationBulletinComponent implements OnInit {

  bulletins: Array<BulletinSoin>;
  bulletinsCopy: Array<BulletinSoin>;
  assures: Array<any>;

  constructor(private router: Router, private bulletinSoinService: BulletinSoinService,
              private assureService: AssuresService, private dialogService: DivDialogService,
              private resolver: ComponentFactoryResolver, private accessTokenService: AccessTokenService,
              private headerService: HeaderService) { }




  activateSearch() {
    this.headerService.showSearch = true;
    this.headerService.placeholder = 'Chercher par Numéro CIN...';
    this.headerService.searchEvent.subscribe(
      (v) => {

        const value = this.headerService.searchText;

        if (value !== '') {
          this.bulletins = this.bulletins.filter( u => {

            const cin =  this.findAssureCinByBulletinId(u.id) + '';

            if (cin.startsWith(value)) {
              return true;
            } else {
              return false;
            }

          });
        } else {
          this.bulletins = this.bulletinsCopy;
        }

      }
    );
  }


  ngOnInit() {


    setTimeout(() => this.activateSearch(), 500);


    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:consulter)');
    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.bulletinSoinService.getAllBulletins(ato.access_token).subscribe(
          (result: Array<BulletinSoin>) => {
            this.bulletins = result.filter( b => b.etat === 'Chez GAT');
            this.bulletinsCopy = this.bulletins;
          },
          (e) => console.log(e)

        );

        this.assureService.getAll(ato.access_token).subscribe(
          (result: Array<any>) => {
            this.assures = result;
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );


  }



  findAssureCinByBulletinId(id: number) {

    if (this.assures !== null && this.assures !== undefined) {
      for (const a of this.assures) {

        for (const b of a.bulletinSoins) {

          if (b.id === id) {
            return a.cin;
          }

        }
      }
    }

    return null;
  }



  onInfo(id) {
    this.router.navigateByUrl('/dashboard/(dashboard-content:show-bulletin/' + id + ')', {skipLocationChange: true});
    window.history.pushState(null, '', '/dashboard/(dashboard-content:show-bulletin/' + id + ')');

  }



  onValid(id) {


    const factory = this.resolver.resolveComponentFactory(RemboursementDialogComponent);
    const cr: ComponentRef<RemboursementDialogComponent> = this.dialogService.divDialog.createComponent(factory);
    cr.instance.title = 'Validation du bulletin de soin';
    cr.instance.ref = cr;
    cr.instance.sender.subscribe((v) => {


      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {

          this.bulletinSoinService.sendBulletinPDF(cr.instance.PDF.files[0], ato.access_token).subscribe(

            (filename: string) => {

              const bulletin = this.bulletins.filter(b => b.id === id)[0];


              bulletin.urlRemboursement = filename;
              bulletin.remboursement = cr.instance.montant;
              bulletin.resultat = cr.instance.resultat;


              this.bulletinSoinService.validBulletin(bulletin, id, ato.access_token).subscribe(
                (res) => {



                  const fact = this.resolver.resolveComponentFactory(InfoDialogComponent);
                  const crr: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(fact);
                  crr.instance.title = 'Confirmation';
                  crr.instance.message = 'La validation du bulletin a été effectué avec succés';
                  crr.instance.sender.subscribe((vv) => {
                    crr.destroy();
                    this.ngOnInit();



                  });


                },
                (e) => console.log(e)
              );





            },
            (e) => console.log(e)
          );



        },
        (e) => console.log(e)
      );


    });




  }



  onRefuse(id) {

const factory = this.resolver.resolveComponentFactory(RefuserRemboursementComponent);
const ref: ComponentRef<RefuserRemboursementComponent> = this.dialogService.divDialog.createComponent(factory);

ref.instance.title = 'Refuser le bulletin de soin';
ref.instance.ref = ref;
ref.instance.sender.subscribe((v) => {


  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {

      const bulletin = this.bulletins.filter(b => b.id === id)[0];

      bulletin.resultat = ref.instance.resultat;

      this.bulletinSoinService.refuserBulletin(bulletin, id, ato.access_token).subscribe(
        (res) => {


          const fact = this.resolver.resolveComponentFactory(InfoDialogComponent);
          const crr: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(fact);
          crr.instance.title = 'Confirmation';
          crr.instance.message = 'L\'opération a été effectué avec succés';
          crr.instance.sender.subscribe((vv) => {
            crr.destroy();
            this.ngOnInit();

          });

        },
        (e) => console.log(e)
      );

    },
    (e) => console.log(e)
  );


});



  }


}
