import mongoose, { ConnectOptions } from 'mongoose';
import { mongodbConfig } from '../config/mongodb';

const connectOptions: ConnectOptions = {socketTimeoutMS: 0};

export async function connectToDatabase(): Promise<void> {
  try {
    connectionListener();
    await mongoose.connect(mongodbConfig.mongoURI, connectOptions);
  } catch (err) {
    console.error('Connection to MongoDB Atlas failed:', err);
  }
}

function connectionListener() {
    mongoose.connection.on('connected',     () => console.log(`Connected successfully to MongoDB Atlas host ${getDatabaseConnection().host}` ));
    mongoose.connection.on('open',          () => console.log('Connection to MongoDB Atlas is open'));
    mongoose.connection.on('disconnected',  () => console.log('Connection to MongoDB Atlas got disconnected'));
    mongoose.connection.on('reconnected',   () => console.log('Connection to MongoDB Atlas got reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('Connection to MongoDB Atlas is disconnecting'));
    mongoose.connection.on('close',         () => console.log('Connection to MongoDB Atlas got closed'));
}

// Access the Mongoose connection object
export function getDatabaseConnection() {
  return mongoose.connection;
}
