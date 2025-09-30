import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.config';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello World');
});

sequelize
   .sync()
   .then(() => console.log('Database connected : ✅✅✅'))
   .catch((err) => console.error('❌ DB connection error:', err));

app.listen(process.env.PORT, () => {
   console.log('Server is running  : ✅✅✅');
});
