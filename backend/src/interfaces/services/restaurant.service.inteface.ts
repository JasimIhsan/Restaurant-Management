import { IRestaurantDto } from '../../dto/restaurant.dto';

export interface IRestaurantService {
   add(data: { name: string; address: string; contact: string }): Promise<IRestaurantDto>;
   getAll(): Promise<IRestaurantDto[]>;
   update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurantDto>;
   delete(id: number): Promise<void>;
}
