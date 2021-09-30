require('dotenv').config();

import express from "express";
import {ApolloServer} from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/';
import { connectDatabase } from "./database";

const startExpressApolloServer = async () => {
  const db = await connectDatabase();
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({app, path: '/api'})
  
  
  app.listen(process.env.PORT, () => {
    console.log(`[app]: http://localhost:${process.env.PORT}`);
  });
  const listings = await db.listings.find({}).toArray();
  console.log(listings);
}

startExpressApolloServer();