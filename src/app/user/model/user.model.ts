import { UserResponse } from '../integration/user.response';

export class UserModel {
  public readonly id: number;
  public readonly username: string;
  public readonly password: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly country: string;
  public readonly picture: string;
  public readonly watchedMovies: any[];   // TODO: type it
  public readonly token?: string;

  constructor(user: UserResponse) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.country = user.country;
    this.picture = user.picture;
    this.watchedMovies = user.watchedMovies;
    this.token = user.token;
  }
}
