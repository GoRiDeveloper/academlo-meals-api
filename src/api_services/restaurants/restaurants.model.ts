import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { MealModel } from '../meals/meals.model';
import { ReviewModel } from '../reviews/reviews.model';
import { RestaurantStatus } from './types/restaurant.types';

@Entity({ name: 'restaurants' })
export class RestaurantModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 70, unique: true })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({
    type: 'enum',
    enum: RestaurantStatus,
    default: RestaurantStatus.active,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;

  @OneToMany((_type) => MealModel, (meal) => meal.restaurant)
  meals: MealModel[];

  @OneToMany((_type) => ReviewModel, (review) => review.restaurant)
  reviews: ReviewModel[];
}
