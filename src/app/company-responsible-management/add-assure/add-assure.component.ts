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

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-assure.component.html',
  styleUrls: ['./add-assure.component.css']
})
export class AddAssureComponent implements OnInit {
  mode = 1;
  x: User;
assure: any;
date: Date;
tab: string[];
rout: Router;
form = new FormGroup({
  cin: new FormControl('', [Validators.required, this.verifyCin] ),
  dateCin: new FormControl('', Validators.required ),
  numMatricule: new FormControl('', [Validators.required, this.verifyPositif]),
  nom: new FormControl('', Validators.required),
  prenom: new FormControl('', Validators.required),
  sexe: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  adresse: new FormControl('', Validators.required),
  dateNaissance: new FormControl('',  Validators.required),
  password: new FormControl('', [Validators.required , Validators.minLength(4), this.verifyPassword]),
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
constructor(public es: AssuresService,
            public ads: AdminsService,
            public gs: GestionnairesService) { }

ngOnInit() {
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
verifyUnicityCin(cin: number) {
  if (cin) {
   this.ads.getAdmin(cin).subscribe((response: Admin) => {
    if (response) {
      return false;
    }
  }, error => {console.log('error' + error); });
  this.es.getAssure(cin).subscribe((response: Assure) => {
    if (response) {
        return false;
    }
  });
  this.gs.getGestionnaire(cin).subscribe((response: Gestionnaire) => {
    if (response) {
        return false;
    }
  }); }
  return true;
}
verifyPositif(n: AbstractControl): ValidationErrors | null {
  if (n.value !== null &&  n.value <= 0) {
    return {verifyPositif: true}; }
  return null;
}

verifyCin(control: AbstractControl): ValidationErrors | null {
if (control.value ) {
 console.log(control);
  if (control.value <= 0 || control.value.toString().length !== 8) {
  return {verifyCin: true}; }
 }
return  null;
}
verifyPassword(control: AbstractControl): ValidationErrors | null {
  console.log('password: ' + control.value);
  if (control.value.length === 0 ) { return null; }
    if ( !(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/.test(control.value.toString()))) {
    return {verifyPassword: true};
  }
  return null;
}

verifyDateNaissance(control: AbstractControl): ValidationErrors | null {
   return {verifyNaissance: null};
}
onRedirectToListe() {
  this.rout.navigateByUrl('/dashboard/(dashboard-content:list-user)', {skipLocationChange: true});
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
  this.assure.password = this.form.value.password;
  this.assure.active = true;
  this.assure.dateInscription = new Date();
  this.assure.dateDerniereModif = new Date();
this.ads.addAdmin(this.assure).subscribe((response: Admin) => {
     console.log(response);
     this.x.role = 'Admin';
      this.mode = 2;
      },
    error => { console.log(error); });

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
this.assure.password = this.form.value.password;
this.assure.active = true;
this.assure.dateInscription = new Date();
this.assure.dateDerniereModif = new Date();
this.gs.addGestionnaire(this.assure).subscribe((response: Gestionnaire) => {
   console.log(response);
   this.x.role = 'Gestionnaire';
    this.mode = 2;
    },
  error => { console.log(error); });
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
    this.assure.urlFichierAffiliation = this.form.value.urlFichierAffiliation;
    this.assure.dateNaissance = this.form.value.dateNaissance;
    this.assure.password = this.form.value.password;
    this.assure.salaire = this.form.value.salaire;
    this.assure.active = true;
    this.assure.dateInscription = new Date();
    this.assure.dateDerniereModif = new Date();
    this.assure.nbrPersonneEnCharge = this.form.value.nbrPersonneEnCharge;
    this.assure.nationnalite = this.form.value.nationnalite;
    this.es.add(this.assure).subscribe((response: Assure) => {
      console.log(response);
      this.x.role = 'Assuré';
     this.mode = 2;
      },
      error => { console.log(error); });
  }

}


}
