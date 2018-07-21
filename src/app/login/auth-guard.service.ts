import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   // const url = state.url;

    const admin = JSON.parse(localStorage.getItem('admin'));
    const gestionnaire = JSON.parse(localStorage.getItem('gestionnaire'));
    const assure = JSON.parse(localStorage.getItem('assure'));

   if (admin !== null || gestionnaire !== null || assure !== null) {
     return true;
   } else {

      this.router.navigate(['/login']);

   }

  }
}
