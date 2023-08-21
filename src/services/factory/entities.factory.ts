import { Repository } from 'typeorm';
import { mode, modes } from '../../config/config';
import { AppDataSrc } from '../databases/main.database.config';
import { UserService } from '../../api_services/users/user.service';
import { UserModel } from '../../api_services/users/users.model';
import { RestaurantService } from '../../api_services/restaurants/restaurants.service';
import { RestaurantModel } from '../../api_services/restaurants/restaurants.model';
import { ReviewService } from '../../api_services/reviews/reviews.service';
import { ReviewModel } from '../../api_services/reviews/reviews.model';
import { MealModel } from '../../api_services/meals/meals.model';
import { MealsService } from '../../api_services/meals/meals.service';
import { OrderService } from '../../api_services/orders/orders.service';
import { OrderModel } from '../../api_services/orders/orders.model';

export let userService: UserService,
  restaurantService: RestaurantService,
  reviewService: ReviewService,
  mealService: MealsService,
  orderService: OrderService;

const userRepository: Repository<UserModel> =
  AppDataSrc.getRepository(UserModel);

const restaurantRepository: Repository<RestaurantModel> =
  AppDataSrc.getRepository(RestaurantModel);

const reviewRepository: Repository<ReviewModel> =
  AppDataSrc.getRepository(ReviewModel);

const mealRepository: Repository<MealModel> =
  AppDataSrc.getRepository(MealModel);

const orderRepository: Repository<OrderModel> =
  AppDataSrc.getRepository(OrderModel);

switch (mode) {
  case modes.development:
  case modes.production: {
    userService = new UserService(userRepository);
    restaurantService = new RestaurantService(restaurantRepository);
    reviewService = new ReviewService(reviewRepository);
    mealService = new MealsService(mealRepository);
    orderService = new OrderService(orderRepository);
  }
}
