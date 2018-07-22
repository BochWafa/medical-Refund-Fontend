import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {ArticleMedicalComponent} from './article-medical/article-medical.component';
import {ArticleMedical} from '../../entities/article-medical';
import * as $ from 'jquery';
import {AssuresService} from '../../assures.service';
import {Assure} from '../../assure';
import {Router} from '@angular/router';
import {convertRuleOptions} from 'tslint/lib/configuration';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {DivDialogService} from '../dialogs/div-dialog.service';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-add-bulletin-soin',
  templateUrl: './add-bulletin-soin.component.html',
  styleUrls: ['./add-bulletin-soin.component.css'],
  entryComponents : [ArticleMedicalComponent]
})
export class AddBulletinSoinComponent implements OnInit {

  cin;
  numMatricule;
  nom;
  prenom;
  assure: Assure;
  assures: Array<Assure> = new Array<Assure>();



   articles: Array<ComponentRef<ArticleMedicalComponent>> = new Array<ComponentRef<ArticleMedicalComponent>>();

   @ViewChild('as', {read: ViewContainerRef}) as;




   // ngModel
   montant;
   pdf;
   numBulletin;
   montantPharmacie;
   dateSoin;




  constructor(private bulletinSoinService: BulletinSoinService, private resolver: ComponentFactoryResolver,
              private assureService: AssuresService, private router: Router, private dialogService: DivDialogService,
                private accessTokenService: AccessTokenService, private headerService: HeaderService) { }

  ngOnInit() {

    setTimeout(() => this.headerService.showSearch = false, 200);

    const type = localStorage.getItem('type');

       if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');

    }

    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.assureService.getAll(ato.access_token).subscribe(
          (assures: Array<Assure>) => this.assures = assures,
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );


  }



  annuler() {
    this.articles = new Array<ComponentRef<ArticleMedicalComponent>>();
    this.as.clear();

    this.montant = undefined;
    this.montantPharmacie = undefined;
    this.pdf = undefined;
    this.numBulletin = undefined;
    this.dateSoin = undefined;
  }





  getAssure() {
    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.assureService.getAssureByCIN(this.cin, ato.access_token).subscribe(
          (a: Assure) => {
            if (a !== null) {
              this.assure = a;
              this.nom = a.nom;
              this.prenom = a.prenom;
              this.numMatricule = a.numMatricule;
              console.log(this.assure);
            }
          },
          (e) => console.log(e)
        );
      },
      (e) => console.log(e)
    );

  }

  hiddenForm() {
      if (this.cin === undefined || this.cin === null || this.cin === '0') {
        return true;
      } else {
        return false;
      }
  }


  addArticle() {

    const  factory: ComponentFactory<ArticleMedicalComponent> = this.resolver.resolveComponentFactory(ArticleMedicalComponent);

    const cr: ComponentRef<ArticleMedicalComponent> = this.as.createComponent(factory);
    cr.instance.ref = cr;
    cr.instance.articles = this.articles;
    cr.instance.update = false;
    this.articles.push(cr);



  }




  valider(pdf) {

  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {

      this.bulletinSoinService.sendBulletinPDF(pdf.files[0], ato.access_token).subscribe(

        (fileName: string) => {


          const bulletin = new BulletinSoin(this.numBulletin, fileName, this.montant, this.montantPharmacie,
            new Date(this.dateSoin), 'En cours', true, this.assure);


          this.bulletinSoinService.sendArticlesPDF(this.generateArticleFiles(), ato.access_token).subscribe(

            (filesnames: Array<string>) => {

              bulletin.articleMedicals = this.generateArticles();


              for (let i = 0; i < filesnames.length; i++) {

                bulletin.articleMedicals[i].urlFichier = filesnames[i];

              }

              this.bulletinSoinService.addBulletinSoin(bulletin, ato.access_token).subscribe(

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

        },
        (e) => console.log(e)
      );



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
      files.push(amc.instance.pdfFile);
    }

    return files;
  }
  generateArticles(): Array<ArticleMedical> {

    const articlesMedical = new Array<ArticleMedical>();
    for (const amc of this.articles) {

      const am: ArticleMedical = new ArticleMedical(amc.instance.pdfFile.name, amc.instance.libelle, amc.instance.description,
        amc.instance.prix, amc.instance.quantite, true);

      articlesMedical.push(am);
    }

    return articlesMedical;
  }





  // Validation From

  validForm() {

    if (this.cin !== '0' && this.motantValid() && this.PDFValid() && this.articlesValid() && this.dateSoinValid()
              && this.motantPharmacieValid() && this.numBulletinValid()) {
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
