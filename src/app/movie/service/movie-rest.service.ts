import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../config/service/config.service';
import { MovieResponse } from '../integration/movie.response';

@Injectable()
export class MovieRestService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService) { }

  public getMovies(): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(this.config.getMoviesApiUrl());
  }

  public getMovie(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.config.getMoviesApiUrl()}/${id}`);
  }
}
