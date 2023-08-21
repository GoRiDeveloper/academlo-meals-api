import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { RestaurantModel } from '../restaurants/restaurants.model';
import { MealStatus } from './types/meal.types';

@Entity({ name: 'meals' })
export class MealModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 120, unique: true })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({
    type: 'enum',
    enum: MealStatus,
    default: MealStatus.available,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;

  @ManyToOne((_type) => RestaurantModel, (restaurant) => restaurant.meals)
  restaurant: RestaurantModel;
}
