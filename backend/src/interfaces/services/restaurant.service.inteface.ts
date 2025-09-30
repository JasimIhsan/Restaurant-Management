import { IRestaurantDto } from '../../dto/restaurant.dto';

export interface IRestaurantService {
   add(data: { name: string; address: string; contact: string }): Promise<IRestaurantDto>;
   getAll({ page, limit, search }: { page?: number; limit?: number; search?: string }): Promise<{ restaurants: IRestaurantDto[]; count: number }>;
   update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurantDto>;
   delete(id: number): Promise<void>;
}
