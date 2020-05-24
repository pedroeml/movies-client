import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProfileService } from '../../profile/service/profile.service';
import { UserRequest } from '../../user/integration/user.request';
import { UserModel } from '../../user/model/user.model';
import { WatchedMovieModel } from '../../user/model/watched-movie.model';
import { GenreEnum } from '../enum/genre.enum';
import { MovieModel } from '../model/movie.model';
import { MovieRestService } from './movie-rest.service';

@Injectable()
export class MovieService {
  private readonly genres: GenreEnum[];

  constructor(
    private readonly profileService: ProfileService,
    private readonly restService: MovieRestService) {
    this.genres = [
      GenreEnum.ACTION,
      GenreEnum.COMEDY,
      GenreEnum.FANTASY,
      GenreEnum.HORROR,
      GenreEnum.SCIFI,
    ];
  }

  public getMovies(): Observable<MovieModel[]> {
    return this.restService.getMovies().pipe(
      map(movies => movies.map(movie => new MovieModel(movie))),
      catchError(() => of([])),
    );
  }

  public getMovie(id: string): Observable<MovieModel> {
    return this.restService.getMovie(id).pipe(
      map(movie => new MovieModel(movie)),
      catchError(() => of(undefined)),
    );
  }

  get movieGenres(): GenreEnum[] {
    return this.genres;
  }

  public filterMoviesByGenre(movies: MovieModel[], genre: GenreEnum): MovieModel[] {
    return movies.filter(movie => movie.genre === genre);
  }

  public mapMoviesByGenre(movies: MovieModel[]): MovieModel[][] {
    return this.movieGenres.map(genre => {
      return this.filterMoviesByGenre(movies, genre);
    });
  }

  public loadWatchedMovies(user: UserModel, length?: number): Observable<MovieModel[]> {
    const moviesIds: string[] = user.watchedMovies.map(watchedMovie => watchedMovie.id);

    if (length && length > 0) {
      moviesIds.length = length;
    }

    return of(moviesIds).pipe(
      map(ids => ids.map(id => this.getMovie(id))),
      mergeMap(observables => forkJoin(observables)),
    );
  }

  public updateWatchedMovie(movie: MovieModel, user: UserModel): Observable<UserModel> {
    const request: UserRequest = {
      watchedMovies: user.watchedMovies
    };

    this.incrementViews(movie, user);

    return this.profileService.update(user.id, request);
  }

  private incrementViews(movie: MovieModel, user: UserModel): void {
    const index: number = user.watchedMovies.findIndex(watched => watched.id === movie.id);
    const views: number = index !== -1 ? user.watchedMovies.splice(index, 1)[0].views + 1 : 1;
    const watchedMovie: WatchedMovieModel = new WatchedMovieModel({ id: movie.id, views });
    user.watchedMovies.unshift(watchedMovie);
  }
}
