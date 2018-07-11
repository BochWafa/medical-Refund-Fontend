import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AssuresService} from '../../assures.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-assure.component.html',
  styleUrls: ['./add-assure.component.css']
})
export class AddAssureComponent implements OnInit {
  mode = 1;
assure: Assure = new Assure();
date: Date;
tab: string[];
form = new FormGroup({
  cin: new FormControl('',
    [Validators.required ,
      this.verifyCin
    ] ),
  numMatricule: new FormControl('', Validators.required),
  nom: new FormControl('', Validators.required),
  prenom: new FormControl('', Validators.required),
  situationFamiliale: new FormControl('', Validators.required),
  nomConjoint: new FormControl(),
  adresse: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required,
    Validators.email]),
  filiereCnam: new FormControl('', Validators.required),
  numAffiliationCnam: new FormControl('', Validators.required),
  urlFichierAffiliation: new FormControl(),
  dateNaissance: new FormControl('',  Validators.required),
  password: new FormControl('', [Validators.required ,
  Validators.minLength(4), this.verifyPassword
  ]),
  salaire: new FormControl('', Validators.required),
  dateAffiliation: new FormControl(),
  role: new FormControl('', Validators.required),
  nbrPersonneEnCharge: new FormControl('', Validators.required),
  nationnalite: new FormControl('', Validators.required)
});

constructor(private es: AssuresService) { }

ngOnInit() {
  }
onSave(data) {
}
verifyCin(control: AbstractControl): ValidationErrors | null {
if (control.value !== null && control.value.toString().length !== 8) { return {verifyCin: true}; }
return null;
}

verifyPassword(control: AbstractControl): ValidationErrors | null {
  if (control.value.toString().length === 0 ) { return null; }
    if ( !(/\d/.test(control.value.toString()))) {
    return {verifyPassword: true};
  }
  return null;
}

verifyDateNaissance(control: AbstractControl): ValidationErrors | null {

   return {verifyNaissance: null};
}
onChangeMode() {
  this.form.reset();
  this.mode = 1;
}
add() {
this.assure.cin = this.form.value.cin;
  this.assure.cin = this.form.value.cin;
  this.assure.numMatricule = this.form.value.numMatricule;
  this.assure.nom = this.form.value.nom;
  this.assure.prenom = this.form.value.prenom;
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
  this.assure.dateAffiliation = new Date();
  this.assure.role = this.form.value.role;
  this.assure.nbrPersonneEnCharge = this.form.value.nbrPersonneEnCharge;
  this.assure.nationnalite = this.form.value.nationnalite;

  this.es.add(this.assure).subscribe((response: Assure) => {
    console.log(response);
   this.mode = 2;
    },
    error => { console.log(error); });
}


}
