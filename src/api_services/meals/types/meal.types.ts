import { Repository } from 'typeorm';
import { MealModel } from '../meals.model';

export enum MealStatus {
  available = 'available',
  disabled = 'disabled',
}
export type MealRepository = Repository<MealModel>;
