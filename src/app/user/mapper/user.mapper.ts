import { Injectable } from '@angular/core';

import { UserResponse } from '../integration/user.response';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserMapper {

  public mapToResponse(model: UserModel): UserResponse {
    return {
      id: model.id,
      username: model.username,
      password: model.password,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      country: model.country,
      picture: model.picture,
      watchedMovies: model.watchedMovies,
      token: model.token,
    };
  }
}
