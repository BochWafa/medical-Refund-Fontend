import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {DivDialogService} from '../../dialogs/div-dialog.service';


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
      return true;
    } else {
      return false;
    }
  }

prixValid() {

  if (this.prix != null && this.prix >= 0 && this.prix <= 999) {
    return true;
  } else {
    return false;
  }
}

quantiteValid() {
      if (this.quantite != null && this.quantite >= 0 && this.quantite <= 20) {
        return true;
      } else {
        return false;
      }
  }



  descritionValid() {
    if (this.description != null && this.description.length >= 5 && this.description.length <= 255) {
      return true;
    } else {
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
