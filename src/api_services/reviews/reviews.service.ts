import { type ReviewRepository, ReviewStatus } from './types/review.types';
import { EntityService } from '../../services/entity.service';
import { type ReviewModel } from './reviews.model';
import { type FindResult } from '../../types/service.types';
import { EntitySchema } from 'typeorm';
import {
  restaurantService,
  userService,
} from '../../services/factory/entities.factory';
import { RestaurantModel } from '../restaurants/restaurants.model';
import { reviewDto } from './review.dto';
import { UserModel } from '../users/users.model';

export class ReviewService {
  private reviewRepository: ReviewRepository;
  private entityService: EntityService;

  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
    this.entityService = new EntityService(reviewRepository);
  }

  async createReview(
    userId: number,
    restaurantId: number,
    data: ReviewModel
  ): Promise<FindResult> {
    const restaurant = (await restaurantService.findOneRestaurant(
      restaurantId,
      false
    )) as RestaurantModel;
    const user = (await userService.findOneUser(
      { id: userId },
      false,
      false,
      true
    )) as UserModel;

    data.restaurant = restaurant;
    data.user = user;

    const review = await this.entityService.create(data);

    return reviewDto(review);
  }

  async findOneReview(
    id: number,
    attributes: object | false,
    relationsAttributes: object | false,
    error: boolean
  ): Promise<FindResult> {
    return await this.entityService.findOne(
      { id, status: ReviewStatus.avaible },
      attributes,
      relationsAttributes,
      error
    );
  }

  async updateReview(id: number, data: { id?: number }): Promise<FindResult> {
    data.id = id;

    const review = await this.entityService.updateOne(data as EntitySchema);

    delete review?.id;

    return review;
  }

  async disableReview(id: number): Promise<FindResult> {
    const review = { id, status: ReviewStatus.deleted };
    return await this.reviewRepository.save(review);
  }
}
