import { WatchedMovieResquest } from './watched-movie.request';

export interface UserRequest {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  country?: string;
  watchedMovies?: WatchedMovieResquest[];
}
