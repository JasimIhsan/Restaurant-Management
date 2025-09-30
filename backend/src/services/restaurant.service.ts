import { IRestaurantRepository } from '../interfaces/repositories/restaurant.repository';
import { IRestaurantService } from '../interfaces/services/restaurant.service.inteface';

export class RestaurantService implements IRestaurantService {
   constructor(private readonly restaurantRepository: IRestaurantRepository) {}

   add = async (data: { name: string; address: string; contact: string }) => {
      if (!data.name || !data.address || !data.contact) {
         throw new Error('All fields are required');
      }
      return await this.restaurantRepository.create(data);
   };

   getAll = async () => {
      return await this.restaurantRepository.findAll();
   };
}
