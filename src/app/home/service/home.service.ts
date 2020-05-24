import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
    return this.movieService.loadWatchedMovies(user, length);
  }
}
