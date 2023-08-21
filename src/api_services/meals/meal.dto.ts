import { ObjectLiteral } from 'typeorm';
import { MealModel } from './meals.model';
import { restaurantDto } from '../restaurants/restaurants.dto';

export const mealDto = (meal: MealModel | ObjectLiteral) => {
  return {
    name: meal.name,
    price: meal.price,
    restaurant: meal.restaurant && restaurantDto(meal.restaurant),
  };
};
