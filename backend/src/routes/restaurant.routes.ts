import { Router } from 'express';
import { restaurantController } from '../controllers/composer';

export const restaurantRoutes = Router();

restaurantRoutes.route('/').get(restaurantController.getAll).post(restaurantController.add);
