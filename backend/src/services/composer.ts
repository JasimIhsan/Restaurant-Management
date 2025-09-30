import { RestaurantService } from './restaurant.service';
import { restaurantRepository } from '../repositories/composer';

export const restaurantService = new RestaurantService(restaurantRepository);
