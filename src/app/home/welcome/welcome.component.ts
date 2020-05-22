import { Component } from '@angular/core';

import { first } from 'rxjs/operators';

import { AuthService } from '../../auth/service/auth.service';
import { UserModel } from '../../user/model/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  public user: UserModel;

  constructor(private readonly authService: AuthService) {
    this.authService.user.pipe(
      first(),
    ).subscribe(
      user => { this.user = user; }
    );
  }

  get userName(): string {
    return !this.user ? '' : `${this.user.firstName} ${this.user.lastName}`;
  }
}
