import { Component, Input, OnInit } from '@angular/core';

import { GenreViews } from '../model/genre-views.interface';
import { RegionMovieCollection } from '../model/region-movie-collection.interface';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-top-genres',
  templateUrl: 'top-genres.component.html',
  styleUrls: ['./top-genres.component.css'],
})
export class TopGenresComponent implements OnInit {
  public genres: GenreViews[];

  @Input()
  public moviesByRegion: RegionMovieCollection;

  constructor(private readonly service: MetricsService) { }

  ngOnInit() {
    this.genres = this.service.topGenres(this.moviesByRegion);
  }
}
