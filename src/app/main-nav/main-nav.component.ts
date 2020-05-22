import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  public isHandset$: Observable<boolean>;

  @Input()
  public observeIsHandset: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit() {
    this.isHandset$ = this.observeIsHandset;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
