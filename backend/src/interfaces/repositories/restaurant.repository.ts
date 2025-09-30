import { IRestaurant } from '../../models/restaurant.model';

export interface IRestaurantRepository {
   create(data: { name: string; address: string; contact: string }): Promise<IRestaurant>;
   findAll(): Promise<IRestaurant[]>;
   update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurant | null>;
   delete(id: number): Promise<number>;
}
