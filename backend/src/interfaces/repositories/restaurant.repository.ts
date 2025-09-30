import { IRestaurant } from '../../models/restaurant.model';

export interface IRestaurantRepository {
   create(data: { name: string; address: string; contact: string }): Promise<IRestaurant>;
   findAll(page?: number, limit?: number, search?: string): Promise<{ rows: IRestaurant[]; count: number }>;
   update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurant | null>;
   delete(id: number): Promise<number>;
   isAlreadyExist(name: string, address: string, contact: string): Promise<IRestaurant | null>;
}
