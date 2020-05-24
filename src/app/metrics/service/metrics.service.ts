import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { MovieModel } from '../../movie/model/movie.model';
import { MovieService } from '../../movie/service/movie.service';
import { ProfileService } from '../../profile/service/profile.service';
import { UserModel } from '../../user/model/user.model';
import { WatchedMovieModel } from '../../user/model/watched-movie.model';
import { UserService } from '../../user/service/user.service';
import { RegionMovieCollection } from '../model/region-movie-collection.interface';
import { RegionMovieModel } from '../model/region-movie.model';

@Injectable()
export class MetricsService {

  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    private readonly movieService: MovieService) { }

  public getLoggedUser(): UserModel {
    return this.profileService.user;
  }

  public getTopUsers(length?: number): Observable<UserModel[]> {
    return this.userService.getUsers().pipe(
      map(users => users.sort((userA, userB) => userA.totalViews > userB.totalViews ? -1 : 1)),
      tap(users => {
        if (length && length > 0) {
          users.length = length;
        }
      })
    );
  }

  public topMoviesByRegion(regionWatchedMovies: RegionMovieCollection, country: string, length?: number): RegionMovieModel[] {
    const watchedMovies: RegionMovieModel[] = Object.values(regionWatchedMovies)
      .filter(movie => movie.getViewsByRegion(country) > 0)
      .sort((movieA, movieB) => movieA.getViewsByRegion(country) > movieB.getViewsByRegion(country) ? -1 : 1);

    if (length && length > 0) {
      watchedMovies.length = length;
    }

    return watchedMovies;
  }

  public getAvailableRegions(regionWatchedMovies: RegionMovieCollection): string[] {
    const countries = {};

    Object.values(regionWatchedMovies).forEach(region => {
      Object.keys(region.regionViews).forEach(country => {
        countries[country] = undefined;
      });
    });

    return Object.keys(countries);
  }

  public getMoviesByRegion(): Observable<RegionMovieCollection> {
    return this.userService.getUsers().pipe(
      map(users => this.computeViews(users)),
      switchMap(regionWatchedMovies => this.loadMovies(regionWatchedMovies)),
    );
  }

  private loadMovies(regionWatchedMovies: RegionMovieCollection): Observable<RegionMovieCollection> {
    const moviesIds: string[] =  Object.keys(regionWatchedMovies);

    return of(moviesIds).pipe(
      map(ids => ids.map(id => this.composeRegionWatchedMovie(regionWatchedMovies[id]))),
      mergeMap(observables => forkJoin(observables)),
      map(() => regionWatchedMovies),
    );
  }

  private composeRegionWatchedMovie(regionWatchedMovie: RegionMovieModel): Observable<MovieModel> {
    return this.movieService.getMovie(regionWatchedMovie.id).pipe(
      tap(movie => { regionWatchedMovie.movie = movie; })
    );
  }

  private computeViews(users: UserModel[]): RegionMovieCollection {
    const regionWatchedMovies: RegionMovieCollection = {};

    users.forEach(user => {
      user.watchedMovies.forEach(movie => {
        this.composeViews(regionWatchedMovies, user, movie);
      });
    });

    return regionWatchedMovies;
  }

  private composeViews(regionWatchedMovies: RegionMovieCollection, user: UserModel, movie: WatchedMovieModel): void {
    const regionWatchedMovie: RegionMovieModel = regionWatchedMovies[movie.id];

    if (!regionWatchedMovie) {
      regionWatchedMovies[movie.id] = new RegionMovieModel(movie.id, user.country, movie.views);
    } else {
      regionWatchedMovie.addViews(user.country, movie.views);
    }
  }
}
