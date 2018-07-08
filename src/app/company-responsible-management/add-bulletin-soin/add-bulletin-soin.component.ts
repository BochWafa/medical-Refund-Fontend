import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BulletinSoinService} from '../services/bulletin-soin.service';
import {BulletinSoin} from '../../entities/bulletin-soin';
import {ArticleMedicalComponent} from './article-medical/article-medical.component';
import {ArticleMedical} from '../../entities/article-medical';


@Component({
  selector: 'app-add-bulletin-soin',
  templateUrl: './add-bulletin-soin.component.html',
  styleUrls: ['./add-bulletin-soin.component.css'],
  entryComponents : [ArticleMedicalComponent]
})
export class AddBulletinSoinComponent implements OnInit {

   infoAssureVisibility = false;

   articles: Array<ComponentRef<ArticleMedicalComponent>> = new Array<ComponentRef<ArticleMedicalComponent>>();

   @ViewChild('as', {read: ViewContainerRef}) as;






  constructor(private bulletinSoinService: BulletinSoinService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {


  }



  addArticle() {

    const  factory: ComponentFactory<ArticleMedicalComponent> = this.resolver.resolveComponentFactory(ArticleMedicalComponent);

    const cr: ComponentRef<ArticleMedicalComponent> = this.as.createComponent(factory);
    cr.instance.ref = cr;
    cr.instance.articles = this.articles;
    cr.instance.update = false;
    this.articles.push(cr);

  }



  valider(pdf, montant) {


  this.bulletinSoinService.sendBulletinPDF(pdf.files[0]).subscribe(

    (urlFile: string) => {


      const bulletin = new BulletinSoin(urlFile, montant.value, 'etat', true);


      this.bulletinSoinService.sendArticlesPDF(this.generateArticleFiles()).subscribe(

        (res: string) => {


          bulletin.articleMedicals = this.generateArticles();
          this.bulletinSoinService.addBulletinSoin(bulletin).subscribe(

            (result: string) => {
              alert('bon');
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



  generateArticleFiles() {

    const files = new Array();

    for (const amc of this.articles) {
      files.push(amc.instance.pdf);
    }

    return files;
  }
  generateArticles(): Array<ArticleMedical> {

    const articlesMedical = new Array<ArticleMedical>();
    for (const amc of this.articles) {

      const am: ArticleMedical = new ArticleMedical(amc.instance.pdf.name, amc.instance.libelle, amc.instance.description,
        amc.instance.prix, amc.instance.quantite, true);

      articlesMedical.push(am);
    }

    return articlesMedical;
  }



}
