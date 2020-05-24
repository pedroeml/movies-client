import { WatchedMovieResponse } from './watched-movie.response';

export interface UserResponse {
  id: string;
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  picture: string;
  watchedMovies: WatchedMovieResponse[];
  token?: string;
}
