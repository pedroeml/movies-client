import { RegionViewsModel } from './region-views.model';

export interface RegionViewsCollection {
  [country: string]: RegionViewsModel;
}
