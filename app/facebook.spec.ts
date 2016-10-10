import { Router } from '@angular/router';
import { Http, Response, URLSearchParams } from '@angular/http';
import {FacebookService} from './facebook/facebook.service';

describe('Facebook checking tests: get access token', () => {

  let http: Http;

  let router: Router;

  let facebookService: FacebookService;

  facebookService = new FacebookService(http, router);

  it('Redirection to FB oAuth dialog ', () => {
    facebookService.get_token();
    //expect(window.location.href).toMatch('facebook');
    // Due to under the test execution the service has no window access we cannot here fetch the service window.location will use cnf_url
    expect(facebookService.cnf_url).toMatch('facebook');
  });

  facebookService.access_token = "12345";

  it('Ptevoiusly set token expected', () => expect(facebookService.get_token()).toBe('12345'));

});
