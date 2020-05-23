import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {

  public getAuthApiUrl(): string {
    return environment.authApi;
  }

  public getUsersApiUrl(): string {
    return environment.usersApi;
  }

  public getMoviesApiUrl(): string {
    return environment.moviesApi;
  }
}
