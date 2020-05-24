import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

import { MovieModel } from '../../movie/model/movie.model';
import { MovieService } from '../../movie/service/movie.service';
import { ProfileService } from '../../profile/service/profile.service';
import { UserModel } from '../../user/model/user.model';

@Injectable()
export class HomeService {

  constructor(
    private readonly profileService: ProfileService,
    private readonly movieService: MovieService) {}

  public loadUser(): Observable<UserModel> {
    return this.profileService.load().pipe(
      first(),
    );
  }

  public loadMovies(): Observable<MovieModel[][]> {
    return this.movieService.getMovies().pipe(
      map(movies => this.movieService.mapMoviesByGenre(movies)),
    );
  }

  public loadWatchedMovies(user: UserModel, length?: number): Observable<MovieModel[]> {
    const moviesIds: string[] = user.watchedMovies.map(watchedMovie => watchedMovie.id);

    if (length && length > 0) {
      moviesIds.length = length;
    }

    return of(moviesIds).pipe(
      map(ids => ids.map(id => this.movieService.getMovie(id))),
      mergeMap(observables => forkJoin(observables)),
    );
  }
}
