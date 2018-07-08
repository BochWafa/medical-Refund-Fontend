import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {ArticleMedicalComponent} from '../add-bulletin-soin/article-medical/article-medical.component';
import {ArticleMedical} from '../../entities/article-medical';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-update-bulletin-soin',
  templateUrl: './update-bulletin-soin.component.html',
  styleUrls: ['./update-bulletin-soin.component.css'],
  entryComponents: [ArticleMedicalComponent]
})
export class UpdateBulletinSoinComponent implements OnInit {

  id: number;
  bulletinSoin: BulletinSoin;
  updatePDF = false;

  articles: Array<ComponentRef<ArticleMedicalComponent>> = new Array<ComponentRef<ArticleMedicalComponent>>();
  showArticles = false;
  @ViewChild('as', {read: ViewContainerRef}) as;


  montant = 0;



  constructor(private route: ActivatedRoute, private service: BulletinSoinService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
     const id =  params['id'];
      this.service.getBulletinById(id).subscribe(
        (bs: BulletinSoin) => {
          this.bulletinSoin = bs;
          this.montant = bs.montantRembourse;
          },
        (e) => console.log(e)
      );
    }
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
    this.articles.push(cr);
  }
}

  showArticle() {
    this.showArticles = true;
    this.addArticles();
  }



  valider(pdf) {


    const bulletin = new BulletinSoin(this.bulletinSoin.urlBulletin, this.montant, this.bulletinSoin.etat, this.bulletinSoin.active);
    bulletin.resultat = this.bulletinSoin.resultat;
    bulletin.dateValidation = this.bulletinSoin.dateValidation;
    bulletin.dateAffiliation = this.bulletinSoin.dateAffiliation;
    bulletin.articleMedicals = this.bulletinSoin.articleMedicals;
    bulletin.bordereaux = this.bulletinSoin.bordereaux;
    bulletin.assures = this.bulletinSoin.assures;

    if (this.updatePDF) {

      this.service.deleteById(this.bulletinSoin.id).subscribe(
        (res) => {},
        (e) => console.log(e)
      );

      this.service.sendBulletinPDF(pdf).subscribe(
        (urlFile: string) => {

          bulletin.urlBulletin = urlFile;

          this.service.sendArticlesPDF(this.generateArticleFiles()).subscribe(
            (res: string) => {


              bulletin.articleMedicals = this.generateArticles();
              this.service.addBulletinSoin(bulletin).subscribe(
                (result: string) => {
                },
                (e) => console.log(e)
              );

            },
            (e) => console.log(e)
          );


        },
        (e) => console.log(e)
      );





    } else {




      if (this.bulletinSoin.montantRembourse !== this.montant) {
        this.service.deleteById(this.bulletinSoin.id).subscribe(
          (res) => console.log(res),
          (e) => console.log(e)
        );
      } else {
        bulletin.id = this.bulletinSoin.id;
      }


      const files = this.generateArticleFiles();
      if (files.length > 0) {
      this.service.sendArticlesPDF(files).subscribe(
        (res: string) => {
        },
        (e) => console.log(e)
      );
      }


      bulletin.articleMedicals = this.generateArticles();

      this.service.addBulletinSoin(bulletin).subscribe(
        (result: string) => {
        },
        (e) => console.log(e)
      );

    }




  }



  generateArticleFiles() {

    const files = new Array();

    for (const amc of this.articles) {
      if ((amc.instance.update && amc.instance.updateFile) || !amc.instance.update) {
      files.push(amc.instance.pdf);
      }
    }

    return files;
  }


  generateArticles(): Array<ArticleMedical> {

    const articlesMedical = new Array<ArticleMedical>();
    for (const amc of this.articles) {

      if (!amc.instance.update) {

        const am: ArticleMedical = new ArticleMedical(amc.instance.pdf.name, amc.instance.libelle, amc.instance.description,
          amc.instance.prix, amc.instance.quantite, true);

        articlesMedical.push(am);

      } else if (amc.instance.update && amc.instance.updateFile) {

        const amAncien: ArticleMedical =
          this.bulletinSoin.articleMedicals.filter( amm => amm.id === amc.instance.id)[0];

          this.service.deleteArticleById(amAncien.id).subscribe(
            (res) => {},
            (e) => console.log(e)
          );

        const am: ArticleMedical = new ArticleMedical(amc.instance.pdf.name, amc.instance.libelle, amc.instance.description,
          amc.instance.prix, amc.instance.quantite, true);

        am.bulletinSoins = amAncien.bulletinSoins;

        articlesMedical.push(am);

      } else {

        const amAncien: ArticleMedical =
          this.bulletinSoin.articleMedicals.filter( amm => amm.id === amc.instance.id)[0];


        const am: ArticleMedical = new ArticleMedical(amAncien.urlFichier, amc.instance.libelle, amc.instance.description,
          amc.instance.prix, amc.instance.quantite, true);

        am.bulletinSoins = amAncien.bulletinSoins;

        if (this.detectArticleChange(amAncien, am)) {
          this.service.deleteArticleById(amAncien.id).subscribe(
            (res) => {},
            (e) => console.log(e)
          );

        } else
          if (!this.detectBulletinSoinChange()) {
          am.id = amAncien.id;

        }

        console.log('am : ' + am.id);

        articlesMedical.push(am);
      }


    }

    return articlesMedical;
  }



  detectBulletinSoinChange() {

  return  this.bulletinSoin.montantRembourse !== this.montant;

  }

  detectArticleChange(a1: ArticleMedical, a2: ArticleMedical) {

    let change = false;

    if (a1.libelle !== a2.libelle || a1.description !== a2.description
                    || a1.prix !== a2.prix || a1.quantite !== a2.quantite) {
      change = true;
    }



    return change;
  }


}
