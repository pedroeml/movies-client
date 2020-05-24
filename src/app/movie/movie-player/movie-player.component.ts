import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { ProfileService } from '../../profile/service/profile.service';
import { UserModel } from '../../user/model/user.model';
import { MovieModel } from '../model/movie.model';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-player',
  templateUrl: 'movie-player.component.html',
  styleUrls: ['./movie-player.component.css'],
})
export class MoviePlayerComponent {
  public movie: MovieModel;
  public user: UserModel;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly profileService: ProfileService,
    private readonly service: MovieService) {
    this.load().subscribe();
  }

  get isLoading(): boolean {
    return !this.user || !this.movie;
  }

  get movieUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.videoUrl);
  }

  private load(): Observable<void> {
    return this.captureMovieId().pipe(
      switchMap(id => this.loadMovie(id)),
      switchMap(() => this.loadUser()),
      switchMap(user => this.updateWatchedMovie(this.movie, user)),
      map(() => undefined),
    );
  }

  private loadUser(): Observable<UserModel> {
    return this.profileService.load().pipe(
      tap(user => { this.user = user; }),
    );
  }

  private loadMovie(id: string): Observable<MovieModel> {
    return this.service.getMovie(id).pipe(
      tap(movie => {
        this.movie = movie;

        if (!movie) {
          this.router.navigateByUrl('/home');
        }
      }),
    );
  }

  private captureMovieId(): Observable<string> {
    return this.route.params.pipe(
      first(),
      map((params: ParamMap) => params['id'] || ''),
    );
  }


  private updateWatchedMovie(movie: MovieModel, user: UserModel): Observable<UserModel> {
    return this.service.updateWatchedMovie(movie, user).pipe(
      tap(updatedUser => { this.user = updatedUser; }),
    );
  }
}
