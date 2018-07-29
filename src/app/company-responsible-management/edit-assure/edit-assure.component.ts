import { Component, OnInit } from '@angular/core';
import {Assure} from '../../assure';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AssuresService} from '../../assures.service';
import { AdminsService } from '../../admins.service';
import { GestionnairesService } from '../../gestionnaires.service';
import { User } from '../../user';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';
import {AccessTokenService} from '../../access-token.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-edit-assure',
  templateUrl: './edit-assure.component.html',
  styleUrls: ['./edit-assure.component.css']
})
export class EditAssureComponent implements OnInit {
mode = 1;
strCin: string;
cin: number;
role: string;
user: any;
date: Date;
tab: string[];
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
            (this.form.get('situationFamiliale').value === 'Marié' && (this.form.get('nomConjoint').value !== '' &&
              this.form.get('nomConjoint').value !== null)) ||
            (this.form.get('situationFamiliale').value === 'MariéEnfant' && (this.form.get('nomConjoint').value !== '' &&
              this.form.get('nomConjoint').value !== null) &&
             this.form.get('nbrPersonneEnCharge').value !== null)) {
              test = false; }
           }
  }
  return test;
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

onChangeMode() {
  this.mode = 1;
}

updateUser() {
  this.user.dateDerniereModif = new Date();

  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {
      if (this.role === 'Assuré') {
        this.es.update(this.cin, this.user, ato.access_token).subscribe(() => {
            console.log('okkkkkkkkkkkkk');
            this.mode = 2;
          },
          error => { console.log('errror: ' + error); });

      } else if (this.role === 'Admin') {
        this.ads.update(this.cin, this.user, ato.access_token).subscribe(() => {
            console.log('OKK');
            this.mode = 2;
          },
          error => { console.log('errror: ' + error); });

      } else if (this.role === 'Gestionnaire') {
        this.gs.update(this.cin, this.user, ato.access_token).subscribe(() => {
            console.log('okkkkkkkkkkkkk');
            this.mode = 2;
          },
          error => { console.log('errror: ' + error); });
      }
    },
    (e) => console.log(e)
  );

  }


constructor(private  activatedRoute: ActivatedRoute,
 private es: AssuresService,
 private ads: AdminsService,
 private gs: GestionnairesService, private accessTokenService: AccessTokenService, private router: Router,
            private headerService: HeaderService) {
this.cin = this.activatedRoute.snapshot.params['cin'];
this.role = this.activatedRoute.snapshot.params['role'];
if (this.role === 'Assuré') {
  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {
      this.es.getAssure(this.cin, ato.access_token).subscribe((response: Assure) => {
        this.user = new Assure();
        this.user = response;
        if (this.user.cin.toString().length === 7 ) {
          this.strCin = '0' + this.user.cin.toString();
        } else {this.strCin = this.user.cin.toString(); }
      });
    },
    (e) => console.log(e)
  );

} else if (this.role === 'Admin') {
  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {
      this.ads.getAdmin(this.cin, ato.access_token).subscribe((response: Admin) => {
        this.user = new Admin();
        this.user = response;
        if (this.user.cin.toString().length === 7 ) {
          this.strCin = '0' + this.user.cin.toString();
        } else {this.strCin = this.user.cin.toString(); }

      });
    },
    (e) => console.log(e)
  );

} else if (this.role === 'Gestionnaire') {
  this.accessTokenService.getAccessToken().subscribe(
    (ato: any) => {
      this.gs.getGestionnaire(this.cin, ato.access_token).subscribe((response: Gestionnaire) => {
        this.user = new Gestionnaire();
        this.user = response;
        if (this.user.cin.toString().length === 7 ) {
          this.strCin = '0' + this.user.cin.toString();
        } else {this.strCin = this.user.cin.toString(); }
      });
    },
    (e) => console.log(e)
  );

}
}
  ngOnInit() {

  setTimeout(() => this.headerService.showSearch = false, 200);

    const type = localStorage.getItem('type');

    if (type === 'assure') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:consulter)');

    } else if (type === 'gestionnaire') {
      this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');
      window.history.pushState(null, '', '/dashboard/(dashboard-content:list-bulletin)');

    }

  }
}
