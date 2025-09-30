import { IRestaurantRepository } from '../interfaces/repositories/restaurant.repository';
import { IRestaurantService } from '../interfaces/services/restaurant.service.inteface';
import { IRestaurantDto, mapToRestaurantDto } from '../dto/restaurant.dto';

export class RestaurantService implements IRestaurantService {
   constructor(private readonly restaurantRepository: IRestaurantRepository) {}

   add = async (data: { name: string; address: string; contact: string }): Promise<IRestaurantDto> => {
      if (!data.name || !data.address || !data.contact) {
         throw new Error('All fields are required');
      }
      const isExist = await this.restaurantRepository.isAlreadyExist(data.name, data.address, data.contact);
      if (isExist) throw new Error('Restaurant already exists');

      const restaurant = await this.restaurantRepository.create(data);
      return mapToRestaurantDto(restaurant);
   };

   getAll = async ({ page, limit, search }: { page?: number; limit?: number; search?: string }): Promise<{ restaurants: IRestaurantDto[]; count: number }> => {
      const { rows, count } = await this.restaurantRepository.findAll(page, limit, search);
      return { restaurants: rows.map(mapToRestaurantDto), count };
   };

   update = async (id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurantDto> => {
      const restaurant = await this.restaurantRepository.update(id, data);
      if (!restaurant) {
         throw new Error('Restaurant not found');
      }
      return mapToRestaurantDto(restaurant);
   };

   delete = async (id: number): Promise<void> => {
      const deleted = await this.restaurantRepository.delete(id);
      if (!deleted) throw new Error('Restaurant not found');
      return;
   };
}
