import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../assets/vendor/bootstrap/dist/css/bootstrap.css',
    '../../assets/css/font-awesome/css/font-awesome.css',
    '../../assets/vendor/nprogress/nprogress.css',
    '../../assets/vendor/js/custom.min.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
