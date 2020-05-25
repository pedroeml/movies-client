import { Component } from '@angular/core';

import { RegionMovieCollection } from '../model/region-movie-collection.interface';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  public moviesByRegion: RegionMovieCollection;

  constructor(private readonly service: MetricsService) {
    this.loadMoviesByRegion();
  }

  private loadMoviesByRegion(): void {
    this.service.getMoviesByRegion().subscribe(
      collection => { this.moviesByRegion = collection; }
    );
  }
}
