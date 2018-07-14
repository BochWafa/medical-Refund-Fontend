import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }


  listEmploye() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-assure)', { skipLocationChange: true });
  }



  listBulletin() {

    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)', {skipLocationChange: true});


  }









}
