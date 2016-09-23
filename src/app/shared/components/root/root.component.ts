import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  constructor(private _router: Router) {
  }

  ngOnInit() {
    // [mdl fix] hide sidebar after router changes
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let drawer = document.querySelector('.mdl-layout__drawer');
        let obfuscator = document.querySelector('.mdl-layout__obfuscator');

        if (drawer && drawer.classList.contains('is-visible')) {
          drawer.classList.toggle('is-visible');
        }

        if (obfuscator && obfuscator.classList.contains('is-visible')) {
          obfuscator.classList.toggle('is-visible');
        }
      }
    });
  }
}