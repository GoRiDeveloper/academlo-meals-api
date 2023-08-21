import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { ReviewStatus } from './types/review.types';
import { UserModel } from '../users/users.model';
import { RestaurantModel } from '../restaurants/restaurants.model';

@Entity({ name: 'reviews' })
export class ReviewModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.avaible,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type) => UserModel, (user) => user.reviews, { eager: true })
  user: UserModel;

  @ManyToOne((_type) => RestaurantModel, (restaurant) => restaurant.reviews, {
    eager: true,
  })
  restaurant: RestaurantModel;
}
