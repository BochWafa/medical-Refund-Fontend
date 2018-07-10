import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   subMenu1Visibility = false;
   subMenu2Visibility = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  openEmploye() {

    this.subMenu2Visibility = false;

    this.subMenu1Visibility = !this.subMenu1Visibility;

  }

  addEmploye() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-assure)', { skipLocationChange: true });

  }


  openHealthProfessional() {

    this.subMenu1Visibility = false;

    this.subMenu2Visibility = !this.subMenu2Visibility;

  }

  addProfessionalHealth() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:add-professional-health)', { skipLocationChange: true });
  }







}
