import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AppComponent}  from './app.component';
import {AppRoutesModule} from './app-routes.module';
import {ListComponent}  from './list.component';
import {DetailComponent}  from './detail.component';
import {NotFoundComponent}  from './not.found.component';

import {FacebookService}  from './facebook/facebook.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutesModule,
    CommonModule,
    FormsModule
  ],
  declarations: [AppComponent, ListComponent, DetailComponent, NotFoundComponent],
  providers: [FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
