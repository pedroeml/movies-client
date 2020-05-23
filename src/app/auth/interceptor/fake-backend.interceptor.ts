import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, map, materialize, mergeMap, switchMap, tap } from 'rxjs/operators';

import { UserResponse } from '../../user/integration/user.response';
import { UserMapper } from '../../user/mapper/user.mapper';
import { UserModel } from '../../user/model/user.model';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private readonly token: string;
  private readonly users: UserModel[];

  constructor(
    private readonly mapper: UserMapper,
    private readonly service: UserService) {
    this.users = [];
    this.token = 'fake-token';
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(request.url.endsWith('/users/authenticate') && request.method === 'POST').pipe(
      switchMap(isAuthRequest => this.loadUsers(isAuthRequest)),
      mergeMap(isAuthRequest => isAuthRequest ? this.handleAuthRequest(request) : next.handle(request)),
      materialize(),
      delay(250),
      dematerialize(),
    );
  }

  private loadUsers(isAuthRequest: boolean = true): Observable<boolean> {
    return !isAuthRequest ? of(isAuthRequest) : this.service.getUsers().pipe(
      tap(users => {
        this.users.length = 0;
        this.users.push(...users);
      }),
      map(() => isAuthRequest),
    );
  }

  private findUserFromRequestBody(request: HttpRequest<any>): UserModel {
    if (!request.body) {
      return undefined;
    }

    const user: UserResponse = request.body;
    return this.users.find(u => u.username === user.username && u.password === user.password);
  }

  private composeUserResponse(user: UserModel): UserResponse {
    const response: UserResponse = this.mapper.mapToResponse(user);
    response.token = this.token;

    return response;
  }

  private handleAuthRequest(request: HttpRequest<any>): Observable<HttpResponse<UserResponse>> {
    const user: UserModel = this.findUserFromRequestBody(request);

    if (!user) {
      const errorResponse: HttpErrorResponse = new HttpErrorResponse({
        status: 401,
        error: {
          message: 'Username or password is wrong',
        },
      });
      return throwError(errorResponse);
    }

    const body: UserResponse = this.composeUserResponse(user);
    const response: HttpResponse<UserResponse> = new HttpResponse<UserResponse>({ status: 200, body });

    return of(response);
  }
}
