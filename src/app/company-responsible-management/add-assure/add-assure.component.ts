import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AssuresService} from '../../assures.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Gestionnaire } from '../../Gestionnaire';
import { Admin } from '../../Admin';
import { GestionnairesService } from '../../gestionnaires.service';
import { AdminsService } from '../../admins.service';
import { User } from '../../user';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { UsersService } from '../../users.service';
import { isDefined } from '@angular/compiler/src/util';
=======
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';
>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-assure.component.html',
  styleUrls: ['./add-assure.component.css']
})
export class AddAssureComponent implements OnInit {
  mode = 1;
  x: User;
assure: any;
filedata: any;
date: Date;
tab: string[];
rout: Router;
form = new FormGroup({
  cin: new FormControl('', [this.verifyCin, Validators.required] ),
  dateCin: new FormControl('', Validators.required ),
  numMatricule: new FormControl('', [Validators.required, this.verifyPositif]),
  nom: new FormControl('', Validators.required),
  prenom: new FormControl('', Validators.required),
  sexe: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  adresse: new FormControl('', Validators.required),
  dateNaissance: new FormControl('',  Validators.required),
  role: new FormControl(null, Validators.required),
  poste: new FormControl(),
  situationFamiliale: new FormControl(),
  nomConjoint: new FormControl(),
  filiereCnam: new FormControl(),
  numAffiliationCnam: new FormControl(),
  urlFichierAffiliation: new FormControl(),
  salaire: new FormControl(),
  dateAffiliation: new FormControl(),
  nbrPersonneEnCharge: new FormControl(),
  nationnalite: new FormControl()
});
faute = true;
users;
assures = Array<Assure>();
gestionnaires = Array<Gestionnaire>();
admins = Array<Admin>();
constructor(public es: AssuresService,
            public ads: AdminsService,
            public gs: GestionnairesService,
<<<<<<< HEAD
          private us: UsersService) {
this.es.getAll().subscribe((response: Array<Assure>) => {
  this.assures = response;
});
this.ads.getAll().subscribe((response: Array<Admin>) => {
  this.admins = response;
});
this.gs.getAll().subscribe((response: Array<Gestionnaire>) => {
  this.gestionnaires = response;
});
}

ngOnInit() {
  this.users = new Array<User>();
    this.us.getAll().subscribe( (response: Array<User>) => {
      this.users = response;
      console.log(this.users.length);
    }, error1 => console.log(error1));
=======
            private accessTokenService: AccessTokenService, private router: Router, private headerService: HeaderService) { }




ngOnInit() {


  setTimeout( () => this.headerService.showSearch = false, 200);

  const type = localStorage.getItem('type');

  if(type === 'gestionnaire') {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');
  } else if (type === 'assure') {
    this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');

  }


>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c
  }




testButton() {
  let test = true;
  console.log(this.form);
  if ((this.form.get('role').value === 'Admin' || this.form.get('role').value === 'Gestionnaire') && this.form.valid)  {
    return false;
  } else if ( this.form.get('role').value === 'Assuré' && this.form.valid) {
    if (this.form.get('poste').value !== null &&
           this.form.get('nationnalite').value !== null &&
           this.form.get('situationFamiliale').value !== null &&
           this.form.get('salaire').value !== null &&
           this.form.get('numAffiliationCnam').value !== null &&
           this.form.get('urlFichierAffiliation').value !== null &&
           this.form.get('filiereCnam').value !== null ) {
            if (this.form.get('situationFamiliale').value === 'Célibataire' ||
            (this.form.get('situationFamiliale').value === 'Marié' && (this.form.get('nomConjoint').value !== '' && this.form.get('nomConjoint').value !== null)) ||
            (this.form.get('situationFamiliale').value === 'MariéEnfant' && (this.form.get('nomConjoint').value !== '' && this.form.get('nomConjoint').value !== null) &&
             this.form.get('nbrPersonneEnCharge').value !== null)) {
              test = false; }
           }
  }
  return test;
}
<<<<<<< HEAD
verifyUnicityCin(cin: number) {
  let user: User;
  if (cin !== undefined && cin !== null) {
    for (user of this.users) {
        if (user.cin === cin) {
           return false;
        }
    }}
    return true; }
=======

>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c
verifyPositif(n: AbstractControl): ValidationErrors | null {
  if (n.value !== null &&  n.value <= 0) {
    return {verifyPositif: true}; }
  return null;
}

verifyCin(control: AbstractControl): ValidationErrors | null {
if (control.value) {
  if (control.value <= 0 || control.value.toString().length !== 8) {
  return {verifyCin: true}; }
 }
return  null;
}
verifyNumMatricule(n) {
let ad: Admin;
let as: Assure;
let g: Gestionnaire;
  if (n !== null && n !== undefined) {
    for (ad of this.admins) {
      if (ad.numMatricule === n) {
        return false;
      }
    }
    for (as of this.assures) {
      if (as.numMatricule === n) {
        return false;
      }
    }
    for (g of this.gestionnaires) {
      if (ad.numMatricule === n) {
        return false;
      }
    }
  } else {
        return true; }
        return true;
}


PDFValid() {

  if (this.form.get('urlFichierAffiliation').value !== undefined) {
    const fileExtension = this.form.get('urlFichierAffiliation').value.split('.').pop();
    if (fileExtension.toUpperCase() === 'PDF') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

randomString(len) {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

verifyDateNaissance(control: AbstractControl): ValidationErrors | null {
   return {verifyNaissance: null};
}
onRedirectToListe() {
  this.rout.navigateByUrl('/dashboard/(dashboard-content:list-user)', {skipLocationChange: true});
}
fileEvent(e) {
  this.filedata = e.target.files[0];
        console.log(this.filedata);
  }
add() {
  this.x = new User();
  if (this.form.get('role').value === 'Admin') {
      this.assure = new Admin();
      this.assure.cin = this.form.value.cin;
      this.assure.dateCin = this.form.value.dateCin;
      this.assure.numMatricule = this.form.value.numMatricule;
      this.assure.nom = this.form.value.nom;
      this.assure.prenom = this.form.value.prenom;
      this.assure.adresse = this.form.value.adresse;
  this.assure.email = this.form.value.email;
  this.assure.adresse = this.form.value.adresse;
  this.assure.sexe = this.form.value.sexe;
  this.assure.dateNaissance = this.form.value.dateNaissance;
  this.assure.active = true;
  this.assure.dateInscription = new Date();
<<<<<<< HEAD
  this.assure.dateDerniereModif = null;
    this.assure.password = this.randomString(8);
    this.ads.addAdmin(this.assure).subscribe((response: Admin) => {
     console.log(response);
     this.x.role = 'Admin';
     this.mode = 2;
     this.ads.sendMail(this.assure.cin).subscribe(() => {
      console.log('okk mail');
    }, error => {console.log(error); } );
      },
    error => { console.log(error); });
=======
  this.assure.dateDerniereModif = new Date();
this.accessTokenService.getAccessToken().subscribe(
  (ato: any) => {
    this.ads.addAdmin(this.assure, ato.access_token).subscribe((response: Admin) => {
        console.log(response);
        this.x.role = 'Admin';
        this.mode = 2;
      },
      error => { console.log(error); });
  },
  (e) => console.log(e)
);


>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c
  } else if (this.form.get('role').value === 'Gestionnaire') {
    this.assure = new Gestionnaire();
    this.assure.cin = this.form.value.cin;
    this.assure.dateCin = this.form.value.dateCin;
    this.assure.numMatricule = this.form.value.numMatricule;
    this.assure.nom = this.form.value.nom;
    this.assure.prenom = this.form.value.prenom;
    this.assure.adresse = this.form.value.adresse;
this.assure.email = this.form.value.email;
this.assure.adresse = this.form.value.adresse;
this.assure.sexe = this.form.value.sexe;
this.assure.dateNaissance = this.form.value.dateNaissance;
this.assure.active = true;
this.assure.dateInscription = new Date();
<<<<<<< HEAD
this.assure.dateDerniereModif = null;
this.assure.password = this.randomString(8);
      this.gs.addGestionnaire(this.assure).subscribe((response: Gestionnaire) => {
      console.log(response);
      this.x.role = 'Gestionnaire';
      this.mode = 2;
        this.gs.sendMail(this.assure.cin).subscribe(() => {
          console.log('okk mail');
        }, error => {console.log(error); } );
    },
      error => { console.log(error); });
=======
this.assure.dateDerniereModif = new Date();

this.accessTokenService.getAccessToken().subscribe(
  (ato: any) => {
    this.gs.addGestionnaire(this.assure, ato.access_token).subscribe((response: Gestionnaire) => {
        console.log(response);
        this.x.role = 'Gestionnaire';
        this.mode = 2;
      },
      error => { console.log(error); });
  },
  (e) => console.log(e)
);

>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c
  } else if (this.form.get('role').value === 'Assuré') {
    this.assure = new Assure();
    this.assure.cin = this.form.value.cin;
    this.assure.dateCin = this.form.value.cin;
    this.assure.numMatricule = this.form.value.numMatricule;
    this.assure.nom = this.form.value.nom;
    this.assure.prenom = this.form.value.prenom;
    this.assure.sexe = this.form.value.sexe;
    this.assure.situationFamiliale = this.form.value.situationFamiliale;
    this.assure.nomConjoint = this.form.value.nomConjoint;
    this.assure.adresse = this.form.value.adresse;
    this.assure.email = this.form.value.email;
    this.assure.filiereCnam = this.form.value.filiereCnam;
    this.assure.numAffiliationCnam = this.form.value.numAffiliationCnam;
    this.assure.dateNaissance = this.form.value.dateNaissance;
    this.assure.salaire = this.form.value.salaire;
    this.assure.active = true;
    this.assure.poste = this.form.value.poste;
    this.assure.dateInscription = new Date();
    this.assure.dateDerniereModif = null;
    this.assure.nbrPersonneEnCharge = this.form.value.nbrPersonneEnCharge;
    this.assure.nationnalite = this.form.value.nationnalite;
<<<<<<< HEAD
    this.assure.password = this.randomString(8);
=======
    this.accessTokenService.getAccessToken().subscribe(
      (ato: any) => {
        this.es.add(this.assure, ato.access_token).subscribe((response: Assure) => {
            console.log(response);
            this.x.role = 'Assuré';
            this.mode = 2;
          },
          error => { console.log(error); });
      },
      (e) => console.log(e)
    );

  }

}
>>>>>>> 6784621fdb998c0ee1559cfa569c25a47190775c

    this.es.sendAffFilePDF(this.filedata).subscribe(
    (fileName: string) => {
        this.assure.urlFichierAffiliation = fileName;
        this.es.add(this.assure).subscribe((response: Assure) => {
          console.log(response);
          this.x.role = 'Assuré';
         this.mode = 2;
         this.es.sendMail(this.assure.cin).subscribe(() => {
          console.log('okk mail');
        }, error => {console.log(error); } );
        },
          error => { console.log(error); });

    }, (error) => {
      console.log(error);
    });
    }
}
}
