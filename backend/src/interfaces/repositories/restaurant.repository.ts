import { IRestaurant } from '../../models/restaurant.model';

export interface IRestaurantRepository {
   create(data: { name: string; address: string; contact: string }): Promise<IRestaurant>;
   findAll(): Promise<IRestaurant[]>;
   // findById(id: number): Promise<IRestaurant | null>;
   // update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurant>;
   // delete(id: number): Promise<void>;
}
