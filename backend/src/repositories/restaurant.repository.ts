import { IRestaurant, Restaurant } from '../models/restaurant.model';
import { IRestaurantRepository } from '../interfaces/repositories/restaurant.repository';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.config';

export class RestaurantRepositoryImpl implements IRestaurantRepository {
   async create(data: { name: string; address: string; contact: string }): Promise<IRestaurant> {
      return await Restaurant.create(data);
   }

   async findAll(page: number = 1, limit: number = 10, search?: string): Promise<{ rows: IRestaurant[]; count: number }> {
      const offset = (page - 1) * limit;

      const whereCondition = search
         ? {
              [Op.or]: [sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${search.toLowerCase()}%`), sequelize.where(sequelize.fn('LOWER', sequelize.col('address')), 'LIKE', `%${search.toLowerCase()}%`)],
           }
         : {};

      const result = await Restaurant.findAndCountAll({
         where: whereCondition,
         order: [['createdAt', 'DESC'], ["id", "ASC"]],
         limit,
         offset,
      });

      return {
         rows: result.rows,
         count: result.count,
      };
   }

   async delete(id: number): Promise<number> {
      return await Restaurant.destroy({ where: { id } });
   }

   async update(id: number, data: { name: string; address: string; contact: string }): Promise<IRestaurant | null> {
      await Restaurant.update(data, { where: { id } });
      return await Restaurant.findByPk(id);
   }
}
