import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';

import { AuthService } from '../../auth/service/auth.service';
import { UserRequest } from '../../user/integration/user.request';
import { UserModel } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class ProfileService {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { }

  get user(): UserModel {
    return this.authService.storedUser;
  }

  public load(): Observable<UserModel> {
    return this.userService.getUser(`${this.user.id}`).pipe(
      map(u => {
        if (!u) {
          throw new Error(`Failed to fetch User ID ${this.user.id}`);
        }

        return u;
      }),
      retry(),
    );
  }

  public update(id: string, request: UserRequest): Observable<UserModel> {
    const token: string = this.user.token;

    return this.userService.updateUser(id, request).pipe(
      tap(user => {
        if (user) {
          this.authService.storeUser(new UserModel({...user, ...{ token }}));
        }
      }),
    );
  }
}
