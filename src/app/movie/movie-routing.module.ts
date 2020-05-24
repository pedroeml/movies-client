import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviePlayerComponent } from './movie-player/movie-player.component';

const routes: Routes = [{
  path: ':id',
  component: MoviePlayerComponent,
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full',
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class MovieRoutingModule { }
