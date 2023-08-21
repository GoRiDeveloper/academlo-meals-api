import { EntitySchema } from 'typeorm';
import { MealStatus, type MealRepository } from './types/meal.types';
import { EntityService } from '../../services/entity.service';
import type { FindResult, FindResults } from '../../types/service.types';
import { MealModel } from './meals.model';
import { restaurantService } from '../../services/factory/entities.factory';
import { type RestaurantModel } from '../restaurants/restaurants.model';
import { mealDto } from './meal.dto';

export class MealsService {
  private mealRepository: MealRepository;
  private entityService: EntityService;

  constructor(mealRepository: MealRepository) {
    this.mealRepository = mealRepository;
    this.entityService = new EntityService(mealRepository);
  }

  async findAllMeals(): Promise<FindResults> {
    const attributes = {
      name: true,
      price: true,
    };
    return await this.entityService.findAll(
      { status: MealStatus.available },
      attributes,
      false
    );
  }

  async findMeal(id: number, basicAttributes: boolean): Promise<FindResult> {
    const attributes = {
      name: true,
      price: true,
    };
    return await this.entityService.findOne(
      { id, status: MealStatus.available },
      basicAttributes ? attributes : false,
      false,
      true
    );
  }

  async createMeal(restaurantId: number, data: MealModel): Promise<FindResult> {
    const restaurant = (await restaurantService.findOneRestaurant(
      restaurantId,
      false
    )) as RestaurantModel;

    data.restaurant = restaurant;

    const meal = await this.entityService.create(data);

    return mealDto(meal);
  }

  async updateMeal(id: number, data: { id?: number }): Promise<FindResult> {
    data.id = id;

    const meal = await this.entityService.updateOne(data as EntitySchema);

    delete meal?.id;

    return meal;
  }

  async disableMeal(id: number): Promise<MealModel> {
    await this.findMeal(id, true);
    const update = { id, status: MealStatus.disabled };
    return await this.mealRepository.save(update, { listeners: false });
  }
}
