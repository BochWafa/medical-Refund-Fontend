import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    document.title = 'Cynapsys | Accueil';


    const type = localStorage.getItem('type');

    if (type !== null) {
      if (type === 'admin') {
        this.connectAdmin();
      } else if (type === 'gestionnaire') {
        this.connectGestionnaire();
      } else if (type === 'assure') {
        this.connectAssure();
      }
    }



    $(document).ready(function() {
      // Add smooth scrolling to all links
      $('#infoo').on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          const hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function() {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });


    $(document).ready(function() {
      // Add smooth scrolling to all links
      $('#servicee').on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          const hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function() {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });

    $(document).ready(function() {
      // Add smooth scrolling to all links
      $('#pluss').on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          const hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function() {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });

  }




  connectAdmin() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-user)');
  }

  connectGestionnaire() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:list-bulletin)');

  }


  connectAssure() {
    this.router.navigateByUrl('/dashboard/(dashboard-content:consulter)');
  }



}
