const MongoClient = require('mongodb').MongoClient;

import {
  Database,
  // Booking, Listing, User //db.collection is an untyped function
} from '../lib/types';

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('main');

  return {
    bookings: db.collection('bookings'),
    listings: db.collection('listings'),
    users: db.collection('users'),
  };
};
