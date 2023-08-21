import { type EntitySchema } from 'typeorm';
import { type RestaurantModel } from './restaurants.model';
import {
  type RestaurantRepository,
  type RestaurantsResults,
  RestaurantStatus,
} from './types/restaurant.types';
import { EntityService } from '../../services/entity.service';
import { type FindResult } from '../../types/service.types';
import { restaurantDto } from './restaurants.dto';

export class RestaurantService {
  private restaurantRepository: RestaurantRepository;
  private entityService: EntityService;

  constructor(restaurantRepository: RestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
    this.entityService = new EntityService(restaurantRepository);
  }

  async createRestaurant(restaurant: RestaurantModel): Promise<FindResult> {
    const restaurantCreated = await this.entityService.create(restaurant);
    return restaurantDto(restaurantCreated);
  }

  async findAllRestaurants(): Promise<RestaurantsResults> {
    const attributes = {
      name: true,
      address: true,
      rating: true,
    };

    return await this.entityService.findAll(
      { status: RestaurantStatus.active },
      attributes,
      false
    );
  }

  async findOneRestaurant(
    id: number,
    dtoRequired: boolean
  ): Promise<FindResult> {
    const restaurant = await this.entityService.findOne(
      { id, status: RestaurantStatus.active },
      false,
      false,
      true
    );

    return dtoRequired
      ? restaurantDto(restaurant as RestaurantModel)
      : restaurant;
  }

  async updateRestaurant(
    id: number,
    data: { id?: number }
  ): Promise<FindResult> {
    data.id = id;
    await this.findOneRestaurant(id, true);
    return await this.entityService.updateOne(data as EntitySchema);
  }

  async disableRestaurant(id: number): Promise<FindResult> {
    await this.findOneRestaurant(id, true);
    const update = { id, status: RestaurantStatus.inactive };
    return await this.restaurantRepository.save(update, { listeners: false });
  }
}
