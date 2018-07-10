import {Component, ComponentRef, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-article-medical',
  templateUrl: './article-medical.component.html',
  styleUrls: ['./article-medical.component.css']
})
export class ArticleMedicalComponent implements OnInit {


  libelle;
  description;
  prix;
  quantite;
  pdf;


  ref: ComponentRef<this>;
  articles: Array<ComponentRef<ArticleMedicalComponent>>;

  update = false;
  id;

  updateFile = false;
  urlFichier;
  updateDeleted = false;




  constructor() { }

  ngOnInit() {
  }


  deleteArticle() {

    const index = this.articles.indexOf(this.ref);
    this.articles.splice(index, 1);
    this.ref.destroy();

  }



  openAlert() {



  }

  deleteUpdateArticle() {

    const index = this.articles.indexOf(this.ref);

   this.updateDeleted = true;

    this.ref.destroy();


  }

  uploadFile(file) {
    this.pdf = file.files[0];
  }

}
