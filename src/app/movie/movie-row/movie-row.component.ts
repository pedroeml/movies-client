import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MovieModel } from '../model/movie.model';

@Component({
  selector: 'app-movie-row',
  templateUrl: 'movie-row.component.html',
  styleUrls: ['./movie-row.component.css'],
})
export class MovieRowComponent {

  @Input()
  public movies: MovieModel[];

  @Input()
  public title: string;

  constructor(private readonly sanitizer: DomSanitizer) { }

  get movieGenre(): string {
    return this.title || this.movies.find(movie => !!movie.genre).genre;
  }

  public getMovieImageUrl(movie: MovieModel): SafeResourceUrl {
    const url = movie.videoUrl.replace('www', 'img').replace('embed', 'vi') + '/0.jpg';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
