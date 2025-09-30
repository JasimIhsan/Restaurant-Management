import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string, required = true): string {
   const value = process.env[key];
   if (required && !value) {
      throw new Error(`Missing environment variable: ${key}`);
   }
   return value!;
}

export const env = {
   dbUrl: getEnv('DB_URL'),
   port: Number(getEnv('PORT')),
   frontendUrl: getEnv('FRONTEND_URL'),
   frontendUrlDev: getEnv('FRONTEND_URL_DEV'),
};
