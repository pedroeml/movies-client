import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserRequest } from '../integration/user.request';
import { UserModel } from '../model/user.model';
import { UserRestService } from './user-rest.service';

@Injectable()
export class UserService {
  constructor(private readonly restService: UserRestService) { }

  public getUsers(): Observable<UserModel[]> {
    return this.restService.getUsers().pipe(
      map(users => users.map(user => new UserModel(user))),
      catchError(() => of([])),
    );
  }

  public getUser(id: string): Observable<UserModel> {
    return this.restService.getUser(id).pipe(
      map(user => new UserModel(user)),
      catchError(() => of(undefined)),
    );
  }

  public updateUser(id: string, request: UserRequest): Observable<UserModel> {
    return this.restService.putUser(id, request).pipe(
      map(user => new UserModel(user)),
    );
  }
}
