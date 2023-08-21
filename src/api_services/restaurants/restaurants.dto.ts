import { ObjectLiteral } from 'typeorm';
import { type RestaurantModel } from './restaurants.model';

export const restaurantDto = (restaurant: RestaurantModel | ObjectLiteral) => {
  return {
    name: restaurant.name,
    address: restaurant.address,
    rating: restaurant.rating,
  };
};
