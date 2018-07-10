export class BulletinSoin {


   id: number;
   urlBulletin: string;
   montantRembourse: number;
   etat: number;
   resultat: string;
   dateValidation: string;
   dateAffiliation: string;
   active: boolean;
   articleMedicals: Array<any>;
   bordereaux: any;
   assures: any;


  constructor(urlBulletin, montantRembourse, etat, active) {
    this.urlBulletin = urlBulletin;
    this.montantRembourse = montantRembourse;
    this.etat = etat;
    this.active = active;
  }


}
