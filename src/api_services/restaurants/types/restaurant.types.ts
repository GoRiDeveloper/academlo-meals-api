import type { ObjectLiteral, Repository } from 'typeorm';
import type { RestaurantModel } from '../restaurants.model';

export enum RestaurantStatus {
  active = 'active',
  inactive = 'inactive',
}
export type RestaurantRepository = Repository<RestaurantModel>;
export type RestaurantsResults = [ObjectLiteral[], number];
