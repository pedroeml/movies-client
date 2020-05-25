import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from '../../user/model/user.model';
import { RegionMovieCollection } from '../model/region-movie-collection.interface';
import { RegionMovieModel } from '../model/region-movie.model';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: 'top-movies.component.html',
  styleUrls: ['top-movies.component.css'],
})
export class TopMoviesComponent implements OnInit {
  private readonly limit: number;
  private readonly user: UserModel;
  private country: string;
  public countries: string[];
  public topMovies: RegionMovieModel[];

  @Input()
  public moviesByRegion: RegionMovieCollection;

  constructor(private readonly service: MetricsService) {
    this.limit = 5;
    this.user = this.service.getLoggedUser();
  }

  ngOnInit() {
    this.countries = this.service.getAvailableRegions(this.moviesByRegion);
    this.selectedCountry = this.user.country;
  }

  get selectedCountry(): string {
    return this.country;
  }

  set selectedCountry(country: string) {
    if (this.country !== country) {
      this.country = country;
      this.updateTopMovies();
    }
  }

  private updateTopMovies(): void {
    this.topMovies = this.service.topMoviesByRegion(this.moviesByRegion, this.country, this.limit);
  }

  public totalViewsByCountry(movie: RegionMovieModel): number {
    return movie.getViewsByRegion(this.selectedCountry);
  }
}
