import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {ArticleMedicalComponent} from '../add-bulletin-soin/article-medical/article-medical.component';
import {ArticleMedical} from '../../entities/article-medical';
import * as $ from 'jquery';
import {Assure} from '../../assure';
import {AssuresService} from '../../assures.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {DivDialogService} from '../dialogs/div-dialog.service';
import {Subject} from 'rxjs';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-update-bulletin-soin',
  templateUrl: './update-bulletin-soin.component.html',
  styleUrls: ['./update-bulletin-soin.component.css'],
  entryComponents: [ArticleMedicalComponent]
})
export class UpdateBulletinSoinComponent implements OnInit, AfterViewInit {

  cin;
  numMatricule;
  nom;
  prenom;
  assure: Assure;

  bulletinSoin: BulletinSoin;
  updatePDF = false;

  articles: Array<ComponentRef<ArticleMedicalComponent>> = new Array<ComponentRef<ArticleMedicalComponent>>();


  @ViewChild('as', {read: ViewContainerRef}) as;
  detector: Subject<boolean> = new Subject<boolean>();

  // ngModel
  pdf;
  montant;
  numBulletin;
  montantPharmacie;
  dateSoin;



  articlesChange = false;


  constructor(private route: ActivatedRoute, private service: BulletinSoinService,
                        private resolver: ComponentFactoryResolver, private assureService: AssuresService,
                            private router: Router, private dialogService: DivDialogService,
              private accessTokenService: AccessTokenService, private headerService: HeaderService) {
  }

  ngOnInit() {

    setTimeout(() => this.headerService.showSearch = false, 200);

    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:consulter)');
    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {

        this.route.params.subscribe( params => {
            const id =  params['id'];
            this.service.getBulletinById(id, ato.access_token).subscribe(
              (bs: BulletinSoin) => {
                this.bulletinSoin = bs;
                this.montant = bs.montantRembourse;
                this.numBulletin = bs.numBulletin;
                this.montantPharmacie = bs.montantPharmacie;
                this.dateSoin = bs.dateSoin.toString();
                this.getAssureByBulletinId(id);

                setTimeout(() => this.detector.next(true), 100);

              },
              (e) => console.log(e)
            );
          }
        );

      },
      (e) => console.log(e)
    );

  }


  ngAfterViewInit() {
    this.detector.subscribe(
      (v) => this.addArticles()
    );
  }



getAssureByBulletinId(id: number) {

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.assureService.getAssureByBulletinId(id, ato.access_token).subscribe(
          (a: Assure) => {
            if ( a !== null) {
              this.numMatricule = a.numMatricule;
              this.nom = a.nom;
              this.prenom = a.prenom;
              this.cin = a.cin;
              this.assure = a;
            }
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

}




  addArticle() {
    const  factory: ComponentFactory<ArticleMedicalComponent> = this.resolver.resolveComponentFactory(ArticleMedicalComponent);

    const cr: ComponentRef<ArticleMedicalComponent> = this.as.createComponent(factory);
    cr.instance.ref = cr;
    cr.instance.articles = this.articles;
    cr.instance.update = false;
    this.articles.push(cr);


  }


addArticles() {
  const  factory: ComponentFactory<ArticleMedicalComponent> = this.resolver.resolveComponentFactory(ArticleMedicalComponent);


    for (const a of this.bulletinSoin.articleMedicals) {
      const cr: ComponentRef<ArticleMedicalComponent> = this.as.createComponent(factory);
      cr.instance.ref = cr;
      cr.instance.articles = this.articles;
      cr.instance.update = true;
      cr.instance.id = a.id;
      cr.instance.libelle = a.libelle;
      cr.instance.description = a.description;
      cr.instance.prix = a.prix;
      cr.instance.quantite = a.quantite;
      cr.instance.urlFichier = a.urlFichier;
      cr.instance.bulletinArticles = this.bulletinSoin.articleMedicals;
      cr.instance.bulletinArticle = a;
      this.articles.push(cr);

      cr.instance.sender.subscribe(
        (v) => {
          this.articlesChange = true;
        }
      );

    }

}





  sendBulletin(bulletin: BulletinSoin, filesnames) {


    if (this.articles.length > 0) {
      bulletin.articleMedicals = this.generateArticles();


      for (let i = 0; i < filesnames.length; i++) {

        for (let j = 0; j < bulletin.articleMedicals.length; j++) {
          if (bulletin.articleMedicals[j].urlFichier === '') {
            bulletin.articleMedicals[j].urlFichier = filesnames[i];
            break;
          }
        }

      }


      for (const art of bulletin.articleMedicals) {
        art.id = undefined;
      }

    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.service.addBulletinSoin(bulletin, ato.access_token).subscribe(
          (result: string) => {
            if (result === 'ok') {
              this.succes();
            }
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );



  }


  sendBulletinWitoutFiles(bulletin: BulletinSoin) {



      if (this.articles.length > 0) {


        bulletin.articleMedicals = this.generateArticles();



        if (this.articlesChange) {
          for (const art of bulletin.articleMedicals) {
            art.id = undefined;
          }
        }

      }


      this.accessTokenService.getAccessToken().subscribe(
        (ato: any) => {
          this.service.addBulletinSoin(bulletin, ato.access_token).subscribe(
            (result: string) => {
              if (result === 'ok') {
                this.succes();
              }
            },
            (e) => console.log(e)
          );
        },
        (e) => console.log(e)
      );



    }



  valider(pdf) {

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {



        const bulletin = new BulletinSoin(this.numBulletin, this.bulletinSoin.urlBulletin, this.montant, this.montantPharmacie,
          new Date(this.dateSoin), 'En cours', this.bulletinSoin.active, this.assure);
        bulletin.resultat = this.bulletinSoin.resultat;
        bulletin.dateValidation = this.bulletinSoin.dateValidation;
        bulletin.dateAffiliation = this.bulletinSoin.dateAffiliation;
        bulletin.articleMedicals = this.bulletinSoin.articleMedicals;
        bulletin.bordereaux = this.bulletinSoin.bordereaux;




        if (this.updatePDF) {

          this.service.deleteById(this.bulletinSoin.id, ato.access_token).subscribe(
            (res) => {},
            (e) => console.log(e)
          );

          this.service.sendBulletinPDF(pdf, ato.access_token).subscribe(
            (fileName: string) => {

              bulletin.urlBulletin = fileName;

              const files = this.generateArticleFiles();

              if (files.length > 0) {
                this.service.sendArticlesPDF(this.generateArticleFiles(), ato.access_token).subscribe(
                  (filesnames: Array<string>) => {

                    this.sendBulletin(bulletin, filesnames);

                  },
                  (e) => console.log(e)
                );
              } else {

                this.sendBulletinWitoutFiles(bulletin);

              }

            },
            (e) => console.log(e)
          );





        } else {


          console.log(this.detectBulletinSoinChange());
          if ((this.detectBulletinSoinChange() || this.articlesChange) ||
            (this.articles.length > this.bulletinSoin.articleMedicals.length)) {  // changement ou (+) articles c'est tout

            this.service.deleteById(this.bulletinSoin.id, ato.access_token).subscribe(
              (res) => console.log(res),
              (e) => console.log(e)
            );

          } else {
            bulletin.id = this.bulletinSoin.id;
          }



          const files = this.generateArticleFiles();

          if (files.length > 0) {

            this.service.sendArticlesPDF(files, ato.access_token).subscribe(
              (filesnames: Array<string>) => {

                this.sendBulletin(bulletin, filesnames);
              },
              (e) => console.log(e)
            );



          } else {
            this.sendBulletinWitoutFiles(bulletin);
          }




        }


      },
      (e) => console.log(e)
    );

  }


  succes() {

    const factory: ComponentFactory<InfoDialogComponent> = this.resolver.resolveComponentFactory(InfoDialogComponent);
    const infoDialog: ComponentRef<InfoDialogComponent> = this.dialogService.divDialog.createComponent(factory);
    infoDialog.instance.title = 'Message de confirmation';
    infoDialog.instance.message = 'L\'opération a été effectué avec succés';
    infoDialog.instance.sender.subscribe((v) => {
        infoDialog.destroy();
        this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)', {skipLocationChange: true});
      }
    );


  }



  generateArticleFiles() {

    const files = new Array();

    for (const amc of this.articles) {
      if ((amc.instance.update && amc.instance.updateFile) || !amc.instance.update) {
      files.push(amc.instance.pdfFile);
      }
    }

    return files;
  }


  generateArticles(): Array<ArticleMedical> {

    const articlesMedical = new Array<ArticleMedical>();

    for (const amc of this.articles) {

      if (!amc.instance.update) {

        const am: ArticleMedical = new ArticleMedical('', amc.instance.libelle, amc.instance.description,
          amc.instance.prix, amc.instance.quantite, true);

        articlesMedical.push(am);

      } else if (amc.instance.update && amc.instance.updateFile) {

        const amAncien: ArticleMedical =
          this.bulletinSoin.articleMedicals.filter( amm => amm.id === amc.instance.id)[0];
          const am: ArticleMedical = new ArticleMedical('', amc.instance.libelle, amc.instance.description,
          amc.instance.prix, amc.instance.quantite, true);

        am.bulletinSoins = amAncien.bulletinSoins;

        articlesMedical.push(am);

        this.articlesChange = true;

      } else {



          const amAncien: ArticleMedical =
          this.bulletinSoin.articleMedicals.filter( amm => amm.id === amc.instance.id)[0];



          const am: ArticleMedical = new ArticleMedical(amAncien.urlFichier, amc.instance.libelle, amc.instance.description,
            amc.instance.prix, amc.instance.quantite, true);

          am.bulletinSoins = amAncien.bulletinSoins;


          if (this.detectArticleChange(amAncien, am)) {  // change
            this.articlesChange = true;
          }

          if (amc.instance.updateDeleted) { // deleted
            am.active = false;
          }


          articlesMedical.push(am);


      }


    }

    return articlesMedical;
  }



  detectBulletinSoinChange() {

  return  this.bulletinSoin.montantRembourse !== this.montant || this.bulletinSoin.montantPharmacie !== this.montantPharmacie
     || this.numBulletin !== this.bulletinSoin.numBulletin || new Date(this.dateSoin) !== new Date(this.dateSoin);

  }

  detectArticleChange(a1: ArticleMedical, a2: ArticleMedical) {

    let change = false;



    if (a1.libelle !== a2.libelle || a1.description !== a2.description
                    || a1.prix !== a2.prix || a1.quantite !== a2.quantite) {
      change = true;
    }



    return change;
  }





















  // Validation From

  validForm() {

    if (this.motantValid() && this.PDFValid() && this.articlesValid()) {
      return true;
    } else {
      return false;
    }

  }

  articlesValid() {
    let ok = true;

    for (const am of this.articles) {
      ok =  ok && am.instance.validForm();
    }
    return ok;
  }

  PDFValid() {

    if (this.pdf !== undefined) {
      const fileExtension = this.pdf.split('.').pop();
      if (fileExtension.toUpperCase() === 'PDF') {
        return true;
      } else {
        return false;
      }

    } else if (!this.updatePDF) {
        return true;
    } else {
      return false;
    }

  }

  motantValid(): boolean {

    if (this.montant !== null && this.montant >= 0 && this.montant <= 999) {
      $('#montant').removeClass('is-invalid');
      return true;
    } else {

      if (this.montant !== null && this.montant !== undefined && !this.montant.pristine) {
        $('#montant').addClass('is-invalid');
      }


      return false;
    }

  }


  motantPharmacieValid(): boolean {

    if (this.montantPharmacie !== null && this.montantPharmacie >= 0 && this.montantPharmacie <= 999) {
      $('#montantPharmacie').removeClass('is-invalid');
      return true;
    } else {

      if (this.montantPharmacie !== null && this.montantPharmacie !== undefined && !this.montantPharmacie.pristine) {
        $('#montantPharmacie').addClass('is-invalid');
      }


      return false;
    }

  }


  numBulletinValid(): boolean {
    if (this.numBulletin !== null && this.numBulletin >= 0 && this.numBulletin.toString().length === 8) {
      $('#numBulletin').removeClass('is-invalid');
      return true;
    } else {

      if (this.numBulletin !== undefined && !this.numBulletin.pristine) {
        $('#numBulletin').addClass('is-invalid');
      }


      return false;
    }

  }



  dateSoinValid(): boolean {



    if (this.dateSoin != null && new Date(this.dateSoin).getTime() <= new Date().getTime()) {
      $('#dateSoin').removeClass('is-invalid');
      return true;
    } else {

      if (this.dateSoin !== undefined && !this.dateSoin.pristine) {
        $('#dateSoin').addClass('is-invalid');
      }
      return false;
    }

  }


}
