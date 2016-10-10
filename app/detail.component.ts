import {Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FacebookService }  from './facebook/facebook.service';


@Component({
  template: `
  <a routerLink="/">Home</a>{{id}}
  <div *ngIf="detail">
  <fieldset>{{detail.id}} at {{detail.created_time}}</fieldset>
  <fieldset><input [(ngModel)]="detail.message" placeholder="{{omph}}" /></fieldset>
  <fieldset>
    <button (click)="saveDetail()">Save</button>
    <button (click)="refreshDetail()">Reload</button>
  </fieldset>
  </div>
  `
})

export class DetailComponent implements OnInit {


  pref_detail_url: string = "https://graph.facebook.com/v2.7/";
  id: any;
  detail: any;
  access_token: string;
  detail_url: string;
  detailSaveUrl: string;
  omph: string = "Input your message";

  constructor(private http: Http, private route: ActivatedRoute, private location: Location, private facebookService: FacebookService){
    console.log('constructor:');

console.dir(http);

    //this.init();
  }

  ngOnInit(){
console.log('init:');
    if(!(this.access_token)){

      this.access_token = this.facebookService.get_token();

    }

    this.route.params.forEach((params: Params) => {

      this.id = params['id'];

    });

    this.formDetailUrl();

    // with Observable
    this.http.get(this.detail_url).subscribe(
      (resp:Response) => this.setView(resp),
      (ex:any) => this.handleOAuthError(ex)
    );

    //with Promice
    /*this.http.get(this.detail_url).toPromise()
    .then(
      (resp:Response) => this.setView(resp)
    )
    .catch(
      (ex:any) => this.handleOAuthError(ex)
    );*/

  }

  setView(resp: Response){
    this.detail = resp.json();
  }

  saveDetail(){
    this.formDetailSaveUrl();
    let savedetail = this.detail;
    savedetail.access_token = this.access_token;
    this.http.post(this.detailSaveUrl, savedetail).subscribe(
      function(){ (resp: Response) => this.setView(resp) },
      function(){ (ex:any) => this.handleOAuthError(ex) }
    );

    //with Promice
    /*this.http.get(this.detail_url).toPromise()
    .then(
      (resp:Response) => this.setView(resp)
    )
    .catch(
      (ex:any) => this.handleOAuthError(ex)
    );*/
  }

  refreshDetail(){
    this.ngOnInit();
  }

  formDetailUrl(){
    this.detail_url = this.facebookService.pref_detail_url + this.id + '/?access_token=' + this.access_token;
  }

  formDetailSaveUrl(){
    this.detailSaveUrl = this.pref_detail_url + this.id;
  }

  handleOAuthError(ex: any){
    console.log('handleOAuthError:');
    console.dir(ex);
  }

}
