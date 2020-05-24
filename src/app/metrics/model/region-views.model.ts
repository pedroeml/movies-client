export class RegionViewsModel {
  public readonly country: string;
  private views: number;

  constructor(country: string, views?: number) {
    this.country = country;
    this.views = !views ? 0 : views;
  }

  get totalViews(): number {
    return this.views;
  }

  public addViews(views: number): void {
    this.views += views;
  }
}
