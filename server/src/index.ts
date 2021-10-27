require('dotenv').config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/';
import { connectDatabase } from './database';
import cookieParser from 'cookie-parser';

const startExpressApolloServer = async () => {
  const db = await connectDatabase();

  const app = express();
  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });
  await server.start();
  server.applyMiddleware({ app, path: '/api' });

  app.listen(process.env.PORT, () => {
    console.log(`[app]: http://localhost:${process.env.PORT}`);
  });
};

startExpressApolloServer();
