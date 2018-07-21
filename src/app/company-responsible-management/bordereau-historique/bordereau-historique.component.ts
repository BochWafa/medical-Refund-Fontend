import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BordereauService} from '../services/bordereau.service';
import {Bordereau} from '../../entities/bordereau';
import {BordereauElementComponent} from './bordereau-element/bordereau-element.component';
import {AssuresService} from '../../assures.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {AccessTokenService} from '../../access-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bordereau-historique',
  templateUrl: './bordereau-historique.component.html',
  styleUrls: ['./bordereau-historique.component.css']
})
export class BordereauHistoriqueComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver, private bulletinService: BulletinSoinService,
               private bordereauService: BordereauService, private assureService: AssuresService,
              private accessTokenService: AccessTokenService, private router: Router) { }

   bordereaux: Array<Bordereau>;
   assures: Array<any>;

  @ViewChild('historique', {read: ViewContainerRef}) historyDiv;

  ngOnInit() {

    const type = localStorage.getItem('type');

   if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.bordereauService.getAll(ato.access_token).subscribe(
          (bordereaux: Array<Bordereau>) => {
            this.bordereaux = bordereaux;

            this.afficheHistorique(bordereaux);

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




  afficheHistorique(bordereaux: Array<Bordereau>) {


    for (const bordereau of bordereaux) {

      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.bulletinService.getBulletinsByBordereauId(bordereau.id, ato.access_token).subscribe(
            (bulletins: Array<BulletinSoin>) => {

              this.addBordereauElement(bulletins, bordereau.dateEnvoi);

            },
            (e) => console.log(e)
          );
        },
        (e) => console.log(e)
      );
    }


  }






  addBordereauElement(bulletins: Array<BulletinSoin>, dateEnvoi: Date) {

  const factory = this.resolver.resolveComponentFactory(BordereauElementComponent);
  const cr: ComponentRef<BordereauElementComponent> = this.historyDiv.createComponent(factory);
  cr.instance.dateEnvoi = dateEnvoi;
  cr.instance.bulletins = bulletins;
  cr.instance.assures = this.assures;

  }


}
