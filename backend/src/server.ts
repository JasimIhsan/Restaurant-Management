import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.config';
import { restaurantRoutes } from './routes/restaurant.routes';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
   cors({
      origin: 'http://localhost:5173',
   })
);

app.use(morgan('dev'));

app.use('/api/restaurants', restaurantRoutes);

sequelize
   .sync()
   .then(() => console.log('Database connected : ✅✅✅'))
   .catch((err) => console.error('❌ DB connection error:', err));

app.listen(process.env.PORT, () => {
   console.log('Server is running  : ✅✅✅');
});
