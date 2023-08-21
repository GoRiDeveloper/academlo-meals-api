import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from '../users/users.model';
import { OrderStatus } from './types/order.types';
import { MealModel } from '../meals/meals.model';

@Entity({ name: 'orders' })
export class OrderModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne((_type) => MealModel)
  @JoinColumn({ name: 'meal_id' })
  meal: MealModel;

  @Column({ type: 'float', name: 'total_price' })
  totalPrice: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.active,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type) => UserModel, (user) => user.orders)
  user: UserModel;
}
