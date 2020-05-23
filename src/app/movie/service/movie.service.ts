import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MovieModel } from '../model/movie.model';
import { MovieRestService } from './movie-rest.service';

@Injectable()
export class MovieService {
  constructor(private readonly restService: MovieRestService) { }

  public getUsers(): Observable<MovieModel[]> {
    return this.restService.getMovies().pipe(
      map(movies => movies.map(movie => new MovieModel(movie))),
      catchError(() => of([])),
    );
  }

  public getUser(id: string): Observable<MovieModel> {
    return this.restService.getMovie(id).pipe(
      map(movie => new MovieModel(movie)),
      catchError(() => of(undefined)),
    );
  }
}
