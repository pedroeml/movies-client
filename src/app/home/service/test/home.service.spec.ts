import { async, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { MovieModel } from '../../../movie/model/movie.model';
import { MovieService } from '../../../movie/service/movie.service';
import { ProfileService } from '../../../profile/service/profile.service';
import { UserModel } from '../../../user/model/user.model';
import { HomeService } from '../home.service';

describe('HomeService', () => {
  let service: HomeService;
  let profileService: ProfileService;
  let movieService: MovieService;

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

  const movies: MovieModel[] = [movie]
  const moviesByGenre: MovieModel[][] = [movies];
  const watchedMovies: MovieModel[] = [movie];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HomeService,
        { provide: ProfileService, useClass: class {
          load: () => Observable<UserModel> = () => of(user);
        } },
        { provide: MovieService, useClass: class {
          getMovies: () => Observable<MovieModel[]> = () => of(movies);
          mapMoviesByGenre: () => MovieModel[][] = () => moviesByGenre;
          loadWatchedMovies: () => Observable<MovieModel[]> = () => of(watchedMovies);
        } }
      ],
    });

    service = TestBed.inject(HomeService);
    profileService = TestBed.inject(ProfileService);
    movieService = TestBed.inject(MovieService);
  }));

  describe('Initializing service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When calling [loadUser] method', () => {
    let returnedUser: UserModel;

    beforeEach(() => {
      spyOn(profileService, 'load').and.callThrough();

      service.loadUser().subscribe(
        u => { returnedUser = u; },
      );
    });

    it('should have returned the mocked user', () => {
      expect(returnedUser).toBe(user);
    });
  });

  describe('When calling [loadMovies] method', () => {
    let returnedMovies: MovieModel[][];

    beforeEach(() => {
      spyOn(movieService, 'getMovies').and.callThrough();
      spyOn(movieService, 'mapMoviesByGenre').and.callThrough();

      service.loadMovies().subscribe(
        m => { returnedMovies = m; },
      );
    });

    it('should have been called [getMovies] method from MovieService', () => {
      expect(movieService.getMovies).toHaveBeenCalled();
    });

    it('should have been called [mapMoviesByGenre] method from MovieService', () => {
      expect(movieService.mapMoviesByGenre).toHaveBeenCalled();
    });

    it('should have returned the mocked movies', () => {
      expect(returnedMovies).toBe(moviesByGenre);
    });
  });

  describe('When calling [loadWatchedMovies] method', () => {
    let returnedWatchedMovies: MovieModel[];

    beforeEach(() => {
      spyOn(movieService, 'loadWatchedMovies').and.callThrough();

      service.loadWatchedMovies(user, 5).subscribe(
        m => { returnedWatchedMovies = m; },
      );
    });

    it('should have been called [loadWatchedMovies] method from MovieService', () => {
      expect(movieService.loadWatchedMovies).toHaveBeenCalled();
    });

    it('should have returned the mocked movies', () => {
      expect(returnedWatchedMovies).toBe(watchedMovies);
    });
  });
});
