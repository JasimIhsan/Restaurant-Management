import { NextFunction, Request, Response } from 'express';
import { IRestaurantService } from '../interfaces/services/restaurant.service.inteface';
import { StatusCodes } from 'http-status-codes';

export class RestaurantController {
   constructor(private readonly restaurantService: IRestaurantService) {}

   add = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const restaurant = await this.restaurantService.add(req.body);
         res.status(StatusCodes.CREATED).json({ success: true, data: restaurant });
      } catch (error) {
         next(error);
      }
   };

   getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { page, limit, search } = req.query;
         const { restaurants, count } = await this.restaurantService.getAll({ page: Number(page), limit: Number(limit), search: String(search) });
         res.status(StatusCodes.OK).json({ success: true, data: { restaurants, count } });
      } catch (error) {
         next(error);
      }
   };

   update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { id } = req.params;
         const restaurant = await this.restaurantService.update(Number(id), req.body);
         res.status(StatusCodes.OK).json({ success: true, data: restaurant });
      } catch (error) {
         next(error);
      }
   };

   delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { id } = req.params;
         await this.restaurantService.delete(Number(id));
         res.status(StatusCodes.OK).json({ success: true });
      } catch (error) {
         next(error);
      }
   };
}
