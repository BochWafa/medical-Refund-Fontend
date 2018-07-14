import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AssuresService} from '../../assures.service';

@Component({
  selector: 'app-edit-assure',
  templateUrl: './edit-assure.component.html',
  styleUrls: ['./edit-assure.component.css']
})
export class EditAssureComponent implements OnInit {
mode: number = 1;
id: number;
assure: Assure = new Assure();
date: Date;
tab: string[];
  form = new FormGroup({
    cin: new FormControl(this.assure.cin ,
      [Validators.required ,
        this.verifyCin
      ] ),
    numMatricule: new FormControl(this.assure.numMatricule, Validators.required),
    nom: new FormControl(this.assure.nom, Validators.required),
    prenom: new FormControl(this.assure.prenom, Validators.required),
    situationFamiliale: new FormControl(this.assure.situationFamiliale, Validators.required),
    nomConjoint: new FormControl(),
    adresse: new FormControl(this.assure.adresse, Validators.required),
    email: new FormControl(this.assure.email, [Validators.required,
      Validators.email]),
    filiereCnam: new FormControl(this.assure.filiereCnam, Validators.required),
    numAffiliationCnam: new FormControl(this.assure.numAffiliationCnam, Validators.required),
    urlFichierAffiliation: new FormControl(),
    dateNaissance: new FormControl(this.assure.dateNaissance,  Validators.required),
    password: new FormControl(this.assure.password, [Validators.required ,
      Validators.minLength(4), this.verifyPassword
    ]),
    salaire: new FormControl(this.assure.salaire, Validators.required),
    role: new FormControl(this.assure.role, Validators.required),
    nbrPersonneEnCharge: new FormControl(this.assure.nbrPersonneEnCharge, Validators.required),
    nationnalite: new FormControl(this.assure.nationnalite, Validators.required)
  });
  verifyCin(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    if (control.value !== null && control.value.toString().length !== 8) { return {verifyCin: true}; }
    return null;
  }

  verifyPassword(control: AbstractControl): ValidationErrors | null {
    if (control.value === null ) { return null; }
    if ( !(/\d/.test(control.value.toString()))) {
      return {verifyPassword: true};
    }
    return null;
  }

  verifyDateNaissance(control: AbstractControl): ValidationErrors | null {

    return {verifyNaissance: null};
  }

  update() {
    this.es.update(this.id, this.assure).subscribe((response: Assure) => {
      console.log('okkkkkkkkkkkkk');
        this.mode = 2;
      },
      error => { console.log('errror: ' + error); });
  }


constructor(private  activatedRoute: ActivatedRoute, private es: AssuresService) {

}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.es.getAssure(this.id).subscribe( (response: Assure) => {
      this.assure = response;
    }, error => {console.log(error); });
  }













}
