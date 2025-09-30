import { RestaurantController } from './restuarant.contorller';
import { restaurantService } from '../services/composer';

export const restaurantController = new RestaurantController(restaurantService);
