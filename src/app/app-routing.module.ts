import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
}, {
  path: 'home',
  canActivate: [AuthGuard],
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
}, {
  path: 'player',
  canActivate: [AuthGuard],
  loadChildren: () => import ('./movie/movie.module').then(m => m.MovieModule),
}, {
  path: 'profile',
  canActivate: [AuthGuard],
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
}];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
