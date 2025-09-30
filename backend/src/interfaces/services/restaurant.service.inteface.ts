import { IRestaurant } from '../../models/restaurant.model';

export interface IRestaurantService {
   add(data: { name: string; address: string; contact: string }): Promise<IRestaurant>;
   getAll(): Promise<IRestaurant[]>;
}
