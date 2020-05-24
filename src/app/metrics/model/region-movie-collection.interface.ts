import { RegionMovieModel } from './region-movie.model';

export interface RegionMovieCollection {
  [movieId: string]: RegionMovieModel;
}
