import {Component, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {AssuresService} from '../../assures.service';
import {Router} from '@angular/router';
import {DivDialogService} from '../dialogs/div-dialog.service';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-validation-bulletin',
  templateUrl: './validation-bulletin.component.html',
  styleUrls: ['./validation-bulletin.component.css']
})
export class ValidationBulletinComponent implements OnInit {

  bulletins: Array<BulletinSoin>;
  assures: Array<any>;

  constructor(private router: Router, private bulletinSoinService: BulletinSoinService,
              private assureService: AssuresService, private dialogService: DivDialogService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {

    this.bulletinSoinService.getAllBulletins().subscribe(
      (result: Array<BulletinSoin>) => {
        this.bulletins = result.filter( b => b.etat === 'Chez GAT');
      },
      (e) => console.log(e)

    );

    this.assureService.getAll().subscribe(
      (result: Array<any>) => {
        this.assures = result;
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
  }



  onValid(id) {


    const factory = this.resolver.resolveComponentFactory(ConfirmDialogComponent);
    const cr: ComponentRef<ConfirmDialogComponent> = this.dialogService.divDialog.createComponent(factory);
    cr.instance.title = 'Confirmer la Validation';
    cr.instance.message = 'Voulez vous vraiment confirmer le bulletin de soin';
    cr.instance.ref = cr;
    cr.instance.sender.subscribe((v) => {

      cr.destroy();

      this.bulletinSoinService.validBulletin(id).subscribe(
        (res) => {



          const fact = this.resolver.resolveComponentFactory(InfoDialogComponent);
          const crr: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(fact);
          crr.instance.title = 'Confirmation';
          crr.instance.message = 'La validation du bulletin a été realisé avec succés';
          crr.instance.sender.subscribe((vv) => {
            crr.destroy();
            this.ngOnInit();



          });


        },
        (e) => console.log(e)
      );

    });




  }



}
