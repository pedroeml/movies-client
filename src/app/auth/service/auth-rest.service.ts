import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../config/service/config.service';
import { UserResponse } from '../../user/integration/user.response';

@Injectable()
export class AuthRestService {

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpClient) { }

  public login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.configService.getAuthApiUrl()}/users/authenticate`, { username, password });
  }
}
