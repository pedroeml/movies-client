import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserModel } from '../../user/model/user.model';
import { AuthRestService } from './auth-rest.service';

@Injectable()
export class AuthService {
  private readonly user$: BehaviorSubject<UserModel>;
  public readonly user: Observable<UserModel>;

  constructor(private readonly restService: AuthRestService) {
    this.user$ = new BehaviorSubject<UserModel>(this.getStoredUser());
    this.user = this.user$.asObservable();
  }

  get userValue(): UserModel {
    return this.user$.getValue() || this.getStoredUser();
  }

  public isLoggedIn(): boolean {
    const user: UserModel = this.userValue;
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
    this.deleteStoredUser();
  }

  private storeUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

  private getStoredUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  private deleteStoredUser(): void {
    localStorage.removeItem('user');
    this.user$.next(undefined);
  }
}
