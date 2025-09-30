import { Restaurant } from '../models/restaurant.model';
import { IRestaurantRepository } from '../interfaces/repositories/restaurant.repository';

export class RestaurantRepositoryImpl implements IRestaurantRepository {
   async create(data: { name: string; address: string; contact: string }) {
      return await Restaurant.create(data);
   }

   async findAll() {
      return await Restaurant.findAll();
   }
}
