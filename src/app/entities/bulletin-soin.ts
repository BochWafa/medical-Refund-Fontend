import {Assure} from '../assure';
import {ArticleMedical} from './article-medical';

export class BulletinSoin {


   id: number;
   urlBulletin: string;
   numBulletin: number;
   montantRembourse: number;
   montantPharmacie: number;
   etat: string;
   resultat: string;
   dateValidation: string;
   dateAffiliation: string;
   dateSoin: Date;
   active: boolean;
   articleMedicals: Array<ArticleMedical>;
   bordereaux: any;
   assure: Assure;
   remboursement: number;
   urlRemboursement: string;


  constructor(numBulletin, urlBulletin, montantRembourse, montantPharmacie, dateSoin, etat, active, assure) {
    this.urlBulletin = urlBulletin;
    this.montantRembourse = montantRembourse;
    this.etat = etat;
    this.active = active;
    this.assure = assure;
    this.montantPharmacie = montantPharmacie;
    this.numBulletin = numBulletin;
    this.dateSoin = dateSoin;
  }


}
