import { config } from 'dotenv';
import { UserModel } from '../api_services/users/users.model';
import { ErrorModel } from '../api_services/error/error.model';
import { OrderModel } from '../api_services/orders/orders.model';
import { MealModel } from '../api_services/meals/meals.model';
import { RestaurantModel } from '../api_services/restaurants/restaurants.model';
import { ReviewModel } from '../api_services/reviews/reviews.model';

config();

const ENV = process.env;

export const mode = ENV.NODE_ENV;
export const port = Number(ENV.PORT);
export const salt = Number(ENV.SALT);
export const jwtSecret = ENV.SECRET_JWT_SEED as any;
export const jwtExpiresIn = ENV.JWT_EXPIRES_IN || '2h';

export const modes = Object.freeze({
  development: 'dev',
  production: 'prod',
});

export const dbConfig = Object.freeze({
  type: ENV.DB_TYPE as any,
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    ErrorModel,
    UserModel,
    OrderModel,
    MealModel,
    ReviewModel,
    RestaurantModel,
  ],
});
