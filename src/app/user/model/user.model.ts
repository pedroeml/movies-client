import { UserResponse } from '../integration/user.response';
import { WatchedMovieModel } from './watched-movie.model';

export class UserModel {
  public readonly id: string;
  public readonly username: string;
  public readonly password: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly country: string;
  public readonly picture: string;
  public readonly watchedMovies: WatchedMovieModel[];
  public readonly token?: string;

  constructor(user: UserResponse) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.country = user.country;
    this.picture = user.picture;
    this.watchedMovies = user.watchedMovies.map(watchedMovie => new WatchedMovieModel(watchedMovie));
    this.token = user.token;
  }

  get totalViews(): number {
    return this.watchedMovies.reduce((acc, model) => acc += model.views, 0);
  }
}
