import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../config/service/config.service';
import { UserModel } from '../../user/model/user.model';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: UserModel = this.service.userValue;
    const isAuthApiUrl: boolean = request.url.startsWith(this.configService.getAuthApiUrl());

    if (this.service.isLoggedIn() && isAuthApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
