import { Component } from '@angular/core';
import { Location, PlatformLocation, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Response, URLSearchParams } from '@angular/http';
import { FacebookService }  from './facebook/facebook.service';

@Component({
    template: `
    <h3>{{objsh}}</h3>
    <ul>
      <li *ngFor="let obj of objs; let i = index;">
        <fieldset>
          <label>[{{i}}]: {{obj.id}} at {{obj.created_time}}</label>
          {{obj.message}}
          <a routerLink="/detail/{{obj.id}}">More</a>
        </fieldset>
      </li>
    </ul>
    <button (click)="reloadView()">Reload</button>
    <div>
      <ul>
        <li>{{access_token}}</li>
        <li>{{list_url}}</li>
      </ul>
    </div>
    `
})

export class ListComponent {

  list_url: string = "";
  access_token: string;
  objsh="Waiting for fb msgs loading..."
  omph="Input your message here";
  objs=[
    {
      id:0,
      message:"obj0",
      created_time:"2015-12-02T03:12:51+0000"
    },
    {
      id:1,
      message:"obj1",
      created_time:"2015-12-03T03:12:51+0000"
    },
  ];


  constructor(private http: Http, private router: Router, private facebookService: FacebookService){
    console.log('constructor:');
    console.dir(this.http);
    console.dir(this.router);
    this.init();
  }

  init(){
    console.log('init:');
    console.dir(this.http);
    console.dir(this.router);
    console.dir(this.access_token);

    if(!(this.access_token)){

      this.access_token = this.facebookService.get_token();
    }
    this.getObjects();
  }

  setReqUrl(){
    console.log('setReqUrl:');

    console.dir(this.access_token);
    this.list_url=this.facebookService.pref_list_url + this.access_token;
  }

  getObjects(){
    console.log('getObjects:');
    this.setReqUrl();

    // with Observable
    this.http.get(this.list_url).subscribe(
      (resp:Response) => this.setView(resp),
      (ex:any) => this.handleError(ex)
    );

    //with Promice
    /*this.http.get(this.list_url).toPromise()
    .then(
      (resp:Response) => this.setView(resp)
    )
    .catch(
      (ex:any) => this.handleError(ex)
    );*/
  }

  setView(resp: Response){
    console.log('setView:');
    console.dir(resp);
    this.objs=resp.json().data;
    console.dir(this.objs);
    this.objsh="Objs from " + this.list_url + " loaded!";
  }

  reloadView(){
    this.access_token = null;
    this.init();
  }

  detailView(id: string){
    this.router.navigate(['/detail', id]);
  }

  handleError(ex: any){
    console.log('handleError:');
    console.dir(ex);
    try{
      this.objsh=ex.json().error.message;
    }
    catch(e){
      this.objsh="Error...";
    }
    this.objs=[];
  }

 }
