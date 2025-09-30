import { Request, Response } from 'express';
import { IRestaurantService } from '../interfaces/services/restaurant.service.inteface';

export class RestaurantController {
   constructor(private readonly restaurantService: IRestaurantService) {}

   add = async (req: Request, res: Response) => {
      try {
         const restaurant = await this.restaurantService.add(req.body);
         res.status(201).json(restaurant);
      } catch (error: any) {
         res.status(400).json({ error: error.message });
      }
   };

   getAll = async (req: Request, res: Response) => {
      try {
         const restaurants = await this.restaurantService.getAll();
         res.json(restaurants);
      } catch (error: any) {
         res.status(500).json({ error: error.message });
      }
   };
}
