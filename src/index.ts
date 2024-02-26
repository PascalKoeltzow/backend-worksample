import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './router';
import { connectToDatabase } from './adapter/mongodb';

dotenv.config();

const app: Express = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/', router());

// Start server function
const startServer = async (port: number) => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[server]: Failed to start server:', error);
  }
};

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3111;

startServer(port);
