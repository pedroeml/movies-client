import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly service: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this.service.isLoggedIn();

    if (!isLoggedIn && state.url !== '/login') {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }

    return isLoggedIn;
  }
}
