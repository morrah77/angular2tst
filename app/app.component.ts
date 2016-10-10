import {Component} from '@angular/core';
import {Location, PlatformLocation, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Response, URLSearchParams} from '@angular/http';

import {FacebookService}  from './facebook/facebook.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{main_h1}}</h1>
    <h2 *ngIf="access_token">Your FB access token is {{access_token}}</h2>
    <fieldset *ngIf="!access_token">
      <button (click)="get_token()">Get access token</button>
    </fieldset>
    <router-outlet></router-outlet>
    `,
  styleUrls: ["css/style.css"]
})

export class AppComponent {

  access_token: any = "";

  main_h1 = "FB posts";

  constructor(private http: Http, private router: Router, private facebookService: FacebookService) {
    //console.log('constructor:');
    this.init();
  }

  init() {
    //console.log('init:');

    if (!(this.access_token)) {

      this.access_token = this.facebookService.get_token();

    }

  }

  get_token() {
    this.access_token = this.facebookService.get_token();
  }

}
