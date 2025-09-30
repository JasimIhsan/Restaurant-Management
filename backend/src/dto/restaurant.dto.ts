import { IRestaurant } from '../models/restaurant.model';

export interface IRestaurantDto {
   id?: number;
   name: string;
   address: string;
   contact: string;
   createdAt?: Date;
   updatedAt?: Date;
}

export const mapToRestaurantDto = (restaurant: IRestaurant) => {
   return {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      contact: restaurant.contact,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
   };
};