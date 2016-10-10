import {Injectable} from '@angular/core';

import {Location, PlatformLocation, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()

export class FacebookService {

  location: any;

  pref_cnf_url = "https://www.facebook.com/dialog/oauth?client_id=1529881367326206&response_type=token&scope=public_profile,email,user_posts,publish_actions&redirect_uri=";//http://localhost:3000/

  cnf_url: string = "";

  public access_token: string = "";

  pref_list_url = "https://graph.facebook.com/v2.7/me/posts/?access_token=";

  pref_detail_url: string = "https://graph.facebook.com/v2.7/";

  public list_url: string = "";

  public detail_url: string = "";

  constructor(private http: Http, private router: Router) {
    //console.log('constructor:');

    this.init();
  }

  init() {
    //console.log('init:');

    this.location = window.location;


    let usp = new URLSearchParams(window.location.search);

    //console.dir(this.access_token);
    this.access_token = usp.get('access_token');

    if (!this.access_token) {

      let usp = new URLSearchParams(window.location.hash.startsWith('#') ? window.location.hash.substr(1) : window.location.hash);

      this.access_token = usp.get('access_token');
    }
    //console.dir(this.access_token);

    this.cnf_url = this.pref_cnf_url + this.location;

  }

  get_token() {
    //console.log('get_token:');
    if (!(this.access_token)) {
      this.init();
      window.location.href = this.cnf_url;
    }
    else {
      return this.access_token;
    }
  }

  /*fetchToken(resp: Response){
   //console.log('fetch_token:');
   this.access_token = new URLSearchParams(resp.headers.get('Location')).get('access_token');
   console.dir(this.access_token);
   }*/

  handleOAuthError(ex: any) {
    console.log('handleOAuthError:');
    console.dir(ex);
  }

}
