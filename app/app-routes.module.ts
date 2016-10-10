import {NgModule}      from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent}  from './app.component';
import {ListComponent}  from './list.component';
import {DetailComponent}  from './detail.component';
import {NotFoundComponent}  from './not.found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'detail/:id', component: DetailComponent},
      {path: '', component: ListComponent},
      {path: '**', component: NotFoundComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
