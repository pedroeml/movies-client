import { Component } from '@angular/core';

import { UserModel } from '../../user/model/user.model';
import { RegionMovieCollection } from '../model/region-movie-collection.interface';
import { RegionMovieModel } from '../model/region-movie.model';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  private readonly limit: number;
  private readonly user: UserModel;
  private country: string;
  public countries: string[];
  public moviesByRegion: RegionMovieCollection;
  public topUsers: UserModel[];
  public topMovies: RegionMovieModel[];

  constructor(private readonly service: MetricsService) {
    this.limit = 3;
    this.user = this.service.getLoggedUser();
    this.loadTopUsers();
    this.loadMoviesByRegion();
  }

  get isLoading(): boolean {
    return !this.moviesByRegion || !this.topUsers;
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

  private loadTopUsers(): void {
    this.service.getTopUsers(this.limit).subscribe(
      users => { this.topUsers = users; }
    );
  }

  private loadMoviesByRegion(): void {
    this.service.getMoviesByRegion().subscribe(
      collection => {
        this.countries = this.service.getAvailableRegions(collection);
        this.moviesByRegion = collection;
      },
      () => { },
      () => {
        this.selectedCountry = this.user.country;
      }
    );
  }
}
