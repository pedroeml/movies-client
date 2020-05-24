import { MovieModel } from '../../movie/model/movie.model';
import { RegionViewsCollection } from './region-views-collection.interface';
import { RegionViewsModel } from './region-views.model';

export class RegionMovieModel {
  public readonly id: string;
  public readonly regionViews: RegionViewsCollection;
  private movieModel: MovieModel;

  constructor(id: string, country?: string, views?: number) {
    this.id = id;
    this.regionViews = {};

    if (country && views) {
      this.addRegion(country, views);
    }
  }

  get movie(): MovieModel {
    return this.movieModel;
  }

  set movie(movie: MovieModel) {
    if (!this.movie && movie) {
      this.movieModel = movie;
    }
  }

  get totalViews(): number {
    const regionViews: RegionViewsModel[] = Object.values(this.regionViews);
    return regionViews.reduce((acc, model) => acc += model.totalViews, 0);
  }

  public getViewsByRegion(country: string): number {
    const model: RegionViewsModel = this.regionViews[country];

    return !model ? 0 : model.totalViews;
  }

  private addRegion(country: string, views: number): void {
    this.regionViews[country] = new RegionViewsModel(country, views);
  }

  public addViews(country: string, views: number): void {
    const model: RegionViewsModel = this.regionViews[country];

    if (!model) {
      this.addRegion(country, views);
    } else {
      model.addViews(views);
    }
  }
}
