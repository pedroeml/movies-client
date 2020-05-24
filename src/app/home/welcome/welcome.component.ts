import { Component } from '@angular/core';

import { switchMap, tap } from 'rxjs/operators';

import { MovieModel } from '../../movie/model/movie.model';
import { UserModel } from '../../user/model/user.model';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  public user: UserModel;
  public moviesByGenre: MovieModel[][];
  public watchedMovies: MovieModel[];
  private readonly limit: number;

  constructor(private readonly service: HomeService) {
    this.loadUser();
    this.loadMovies();
    this.limit = 5;
  }

  get userName(): string {
    return !this.user ? '' : `${this.user.firstName} ${this.user.lastName}`;
  }

  get isLoading(): boolean {
    return !this.user || !this.moviesByGenre || !this.watchedMovies;
  }

  public loadUser(): void {
    this.service.loadUser().pipe(
      tap(user => { this.user = user; }),
      switchMap(user => this.service.loadWatchedMovies(user, this.limit)),
    ).subscribe(
      watchedMovies => { this.watchedMovies = watchedMovies; }
    );
  }

  public loadMovies(): void {
    this.service.loadMovies().subscribe(
      movies => { this.moviesByGenre = movies; }
    );
  }
}
