import dotenv from 'dotenv';

dotenv.config();

export const mongodbConfig = {
  mongoURI: process.env.MONGO_DB_URI || ''
};