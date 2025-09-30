import { IRestaurant, Restaurant } from '../models/restaurant.model';
import { IRestaurantRepository } from '../interfaces/repositories/restaurant.repository';

export class RestaurantRepositoryImpl implements IRestaurantRepository {
   async create(data: { name: string; address: string; contact: string }): Promise<IRestaurant> {
      return await Restaurant.create(data);
   }

   async findAll(): Promise<IRestaurant[]> {
      return await Restaurant.findAll();
   }

   async delete(id: number): Promise<number> {
      return await Restaurant.destroy({ where: { id } });
   }

   async update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurant | null> {
      await Restaurant.update(data, { where: { id } });
      return await Restaurant.findByPk(id);
   }
}
