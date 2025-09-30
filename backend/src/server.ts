import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.config';
import { restaurantRoutes } from './routes/restaurant.routes';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/error.handling.middleware';
import { env } from './config/env.config';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   cors({
      origin: [env.frontendUrl, env.frontendUrlDev],
   })
);

app.use(morgan('dev'));

app.use('/api/restaurants', restaurantRoutes);

sequelize
   .sync()
   .then(() => console.log('Database connected : ✅'))
   .catch((err) => console.error('❌ DB connection error:', err));

app.use(errorHandler);

app.listen(env.port, () => {
   console.log('Server is running  : ✅');
});
