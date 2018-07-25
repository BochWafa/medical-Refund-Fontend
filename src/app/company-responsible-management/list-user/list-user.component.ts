import {Component, OnInit, Sanitizer} from '@angular/core';
import {Assure} from '../../assure';
import {Router} from '@angular/router';
import {User} from '../../user';
import {UsersService} from '../../users.service';
import { AssuresService } from '../../assures.service';
import { AdminsService } from '../../admins.service';
import { Admin } from '../../Admin';
import { Gestionnaire } from '../../Gestionnaire';
import { GestionnairesService } from '../../gestionnaires.service';
@Component({
  selector: 'app-add-employe',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
users: Array<User>;
a: Assure;
ad: Admin;
g: Gestionnaire;
  constructor(private us: UsersService,
              private route: Router,
            private ass: AssuresService,
          private ads: AdminsService,
        private gs: GestionnairesService) {}
  ngOnInit() {
    this.users = new Array<User>();
    this.us.getAll().subscribe( (response: Array<User>) => {
      this.users = response;
      console.log(this.users.length);
    }, error1 => console.log(error1));
  }
  onDeleteUser(em: User) {
    if (em.role === 'Assuré') {
        this.ass.getAssure(em.cin).subscribe ((response: Assure) => {
            this.a = response;
            this.ass.delete(this.a.cin).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                  1
              );
            }, error => {console.log(error); });
            }, error => { console.log(error); });
    } else if (em.role === 'Admin') {
        this.ads.getAdmin(em.cin).subscribe ((response: Admin) => {
            this.ad = response;
            this.ads.delete(this.ad.cin).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                  1
              );
            }, error => {console.log(error); });
            }, error => { console.log(error); });
    } else if (em.role === 'Gestionnaire' ) {
       this.gs.getGestionnaire(em.cin).subscribe ((response: Gestionnaire) => {
            this.g = response;
            this.gs.delete(this.a.cin).subscribe (() => {
              this.users.splice(
                this.users.indexOf(em),
                  1
              );
            }, error => {console.log(error); });
            }, error => { console.log(error); });
  }}
onEditUser(em: User) {
this.route.navigateByUrl('/dashboard/(dashboard-content:edit-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
}
onInfoUser(em: User) {
    this.route.navigateByUrl('/dashboard/(dashboard-content:consult-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
}
goAddEmploye() {
    this.route.navigateByUrl('/dashboard/(dashboard-content:add-assure)', {skipLocationChange: true});
}
onHistoryUser(em: User) {
  this.route.navigateByUrl('/dashboard/(dashboard-content:history-user/' + em.cin + '/' + em.role + ')', {skipLocationChange: true});
}
}
