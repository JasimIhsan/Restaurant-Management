import { Sequelize } from 'sequelize';
import { env } from './env.config';

export const sequelize = new Sequelize(env.dbUrl, {
   dialect: 'postgres',
   logging: false,
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   },
});
