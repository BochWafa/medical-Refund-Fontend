export class ArticleMedical {

   id: number;
   urlFichier: string;
   libelle: string;
   description: string;
   prix: number;
   quantite: number;
   active: boolean;
   bulletinSoins: any;


  constructor(urlFichier: string, libelle: string, description: string, prix: number, quantite: number, active: boolean) {
    this.urlFichier = urlFichier;
    this.libelle = libelle;
    this.description = description;
    this.prix = prix;
    this.quantite = quantite;
    this.active = active;
  }
}
