import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export interface IRestaurantAttributes {
   id?: number;
   name: string;
   address: string;
   contact: string;
}

export interface IRestaurant extends Model<IRestaurantAttributes>, IRestaurantAttributes {}

export const Restaurant = sequelize.define<IRestaurant>('Restaurant', {
   name: { type: DataTypes.STRING, allowNull: false },
   address: { type: DataTypes.STRING, allowNull: false },
   contact: { type: DataTypes.STRING, allowNull: false },
});
