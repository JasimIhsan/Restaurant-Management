import { Request, Response } from 'express';
import { IRestaurantService } from '../interfaces/services/restaurant.service.inteface';
import { StatusCodes } from 'http-status-codes';
import { asyncHandler } from '../utils/async.handler';

export class RestaurantController {
   constructor(private readonly restaurantService: IRestaurantService) {}

   add = asyncHandler(async (req: Request, res: Response) => {
      const restaurant = await this.restaurantService.add(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data: restaurant });
   });

   getAll = asyncHandler(async (req: Request, res: Response) => {
      const { page, limit, search } = req.query;
      const { restaurants, count } = await this.restaurantService.getAll({
         page: Number(page),
         limit: Number(limit),
         search: search ? String(search) : undefined,
      });
      res.status(StatusCodes.OK).json({ success: true, data: { restaurants, count } });
   });

   update = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const restaurant = await this.restaurantService.update(Number(id), req.body);
      res.status(StatusCodes.OK).json({ success: true, data: restaurant });
   });

   delete = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      await this.restaurantService.delete(Number(id));
      res.status(StatusCodes.OK).json({ success: true });
   });
}
