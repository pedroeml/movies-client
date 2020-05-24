import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserModel } from '../../user/model/user.model';
import { AuthRestService } from './auth-rest.service';

@Injectable()
export class AuthService {

  constructor(private readonly restService: AuthRestService) { }

  get storedUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  public isLoggedIn(): boolean {
    const user: UserModel = this.storedUser;
    return user && !!user.token;
  }

  public login(username: string, password: string): Observable<UserModel> {
    return this.restService.login(username, password).pipe(
      map(user => new UserModel(user)),
      tap(user => {
        if (user.token) {
          this.storeUser(user);
        }
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
  }

  public storeUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
