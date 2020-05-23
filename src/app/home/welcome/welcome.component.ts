import { Component } from '@angular/core';

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
    this.user = this.authService.storedUser;
  }

  get userName(): string {
    return !this.user ? '' : `${this.user.firstName} ${this.user.lastName}`;
  }
}
