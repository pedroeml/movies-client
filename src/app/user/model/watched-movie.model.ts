import { WatchedMovieResponse } from '../integration/watched-movie.response';

export class WatchedMovieModel {
  public readonly id: string;
  public readonly views: number;

  constructor(watchedMovie: WatchedMovieResponse) {
    this.id = watchedMovie.id;
    this.views = watchedMovie.views;
  }
}
