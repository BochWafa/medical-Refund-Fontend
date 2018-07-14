import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {DivDialogService} from '../../dialogs/div-dialog.service';
import * as $ from 'jquery';
import {Subject} from 'rxjs';
import {ArticleMedical} from '../../../entities/article-medical';

@Component({
  selector: 'app-article-medical',
  templateUrl: './article-medical.component.html',
  styleUrls: ['./article-medical.component.css']
})
export class ArticleMedicalComponent implements OnInit {


  // ngModel
  libelle;
  description;
  prix;
  quantite;
  pdf;



  pdfFile;


  ref: ComponentRef<this>;
  articles: Array<ComponentRef<ArticleMedicalComponent>>;

  update = false;
  id;

  updateFile = false;
  urlFichier;
  updateDeleted = false;


  confirmDialog: ComponentRef<ConfirmDialogComponent>;


  sender: Subject<boolean> = new Subject<boolean>();


  bulletinArticles: Array<ArticleMedical>;
  bulletinArticle: ArticleMedical;


  constructor(private resolver: ComponentFactoryResolver, private confirmDialogService: DivDialogService) { }

  ngOnInit() {
  }


  deleteArticle() {

    const index = this.articles.indexOf(this.ref);
    this.articles.splice(index, 1);
    this.ref.destroy();

  }



  openAlert() {

  const factory: ComponentFactory<ConfirmDialogComponent> = this.resolver.resolveComponentFactory(ConfirmDialogComponent);
  this.confirmDialog = this.confirmDialogService.divDialog.createComponent(factory);
  this.confirmDialog.instance.ref = this.confirmDialog;
  this.confirmDialog.instance.title = 'Suppression de l\'article';
  this.confirmDialog.instance.message = 'Vous voulez vraiment supprimer cet article médical ?';

  this.confirmDialog.instance.sender.subscribe(
    (v) => {
      this.deleteUpdateArticle();
      this.confirmDialog.destroy();
    }
  );



  }

  deleteUpdateArticle() {

    this.updateDeleted = true;

    const index1 = this.articles.indexOf(this.ref);
    this.articles.splice(index1, 1);

    const index2 = this.bulletinArticles.indexOf(this.bulletinArticle);
    this.bulletinArticles.splice(index2, 1);

    this.sender.next(true);
    this.ref.destroy();

  }


  uploadFile(file) {
    this.pdfFile = file.files[0];
  }






  // Validation From


  validForm(): boolean {
    if (this.libelleValid() && this.descritionValid() && this.prixValid() && this.quantiteValid() && this.PDFValid()) {
      return true;
    } else {
      return false;
    }
  }


  libelleValid() {
    if (this.libelle != null && this.libelle.length >= 4 && this.libelle.length <= 40) {
      $('#libelle').removeClass('border border-danger');
      return true;
    } else {
      if (this.libelle !== null && this.libelle !== undefined && !this.libelle.pristine) {
        $('#libelle').addClass('border border-danger');
      }
      return false;
    }
  }

prixValid() {

  if (this.prix != null && this.prix >= 0 && this.prix <= 999) {
    $('#prix').removeClass('border border-danger');
    return true;
  } else {
    if (this.prix !== null && this.prix !== undefined && !this.prix.pristine) {
      $('#prix').addClass('border border-danger');
    }
    return false;
  }
}

quantiteValid() {
      if (this.quantite != null && this.quantite >= 0 && this.quantite <= 20) {
        $('#quantite').removeClass('border border-danger');
        return true;
      } else {
        if (this.quantite !== null && this.quantite !== undefined && !this.quantite.pristine) {
          $('#quantite').addClass('border border-danger');
        }
        return false;
      }
  }



  descritionValid() {
    if (this.description != null && this.description.length >= 5 && this.description.length <= 255) {
      $('#description').removeClass('border border-danger');
      return true;
    } else {
      if (this.description !== null && this.description !== undefined && !this.description.pristine) {
        $('#description').addClass('border border-danger');
      }
      return false;
    }
  }

  PDFValid() {

    if (this.pdf !== undefined) {
      const fileExtension = this.pdf.split('.').pop();
      if (fileExtension.toUpperCase() === 'PDF') {
        return true;
      } else {
        return false;
      }

    } else if (!this.updateFile && this.update) {
      return true;
    } else {
      return false;
    }

  }


}
