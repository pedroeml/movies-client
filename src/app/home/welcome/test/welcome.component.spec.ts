import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { AuthModule } from '../../../auth/auth.module';
import { AuthService } from '../../../auth/service/auth.service';
import { MovieModel } from '../../../movie/model/movie.model';
import { MovieRowComponent } from '../../../movie/movie-row/movie-row.component';
import { UserModel } from '../../../user/model/user.model';
import { WelcomeComponent } from '../welcome.component';
import { HomeService } from './../../service/home.service';

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let component: WelcomeComponent;
  let service: AuthService;

  const user: UserModel = new UserModel({
    id: '0',
    username: 'user',
    password: '123',
    firstName: 'User',
    lastName: 'Test',
    email: '',
    country: '',
    picture: '',
    watchedMovies: [],
    token: 'fake-jwt-token',
  });

  const movie: MovieModel = new MovieModel({
    id: '1',
    name: 'movie',
    genre: 'genre',
    release: '2000',
    videoUrl: 'https://www.video.com/embed/id',
  });

  const moviesByGenre: MovieModel[][] = [[movie]];
  const watchedMovies: MovieModel[] = [movie];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        CommonModule,
        RouterTestingModule,
      ],
      declarations: [
        WelcomeComponent,
        MovieRowComponent,
      ],
      providers: [
        { provide: HomeService, useClass: class {
          loadUser: () => Observable<UserModel> = () => of(user);
          loadMovies: () => Observable<MovieModel[][]> = () => of(moviesByGenre);
          loadWatchedMovies: () => Observable<MovieModel[]> = () => of(watchedMovies);
        } },
      ],
    }).compileComponents().then(() => {
      service = TestBed.inject(AuthService);
      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('Initializing component', () => {
    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should have a UserModel object property', () => {
      expect(component.user).toBe(user);
    });

    it('should have a moviesByGenre MovieModel[][] object property', () => {
      expect(component.moviesByGenre).toBe(moviesByGenre);
    });

    it('should have a watchedMovies MovieModel[] object property', () => {
      expect(component.watchedMovies).toBe(watchedMovies);
    });
  });
});
