import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GenreEnum } from '../enum/genre.enum';
import { MovieModel } from '../model/movie.model';
import { MovieRestService } from './movie-rest.service';

@Injectable()
export class MovieService {
  private readonly genres: GenreEnum[];

  constructor(private readonly restService: MovieRestService) {
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
}
