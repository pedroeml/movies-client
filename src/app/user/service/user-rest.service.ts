import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../config/service/config.service';
import { UserRequest } from '../integration/user.request';
import { UserResponse } from '../integration/user.response';

@Injectable()
export class UserRestService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService) { }

  public getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.config.getUsersApiUrl());
  }

  public getUser(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.config.getUsersApiUrl()}/${id}`);
  }

  public putUser(id: string, user: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.config.getDragonsApiUrl()}/${id}`, user);
  }
}
