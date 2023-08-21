import { ObjectLiteral } from 'typeorm';
import { ReviewModel } from './reviews.model';
import { restaurantDto } from '../restaurants/restaurants.dto';

export const reviewDto = (review: ReviewModel | ObjectLiteral) => {
  return {
    comment: review.comment,
    rating: review.rating,
    restaurant: restaurantDto(review.restaurant),
  };
};
