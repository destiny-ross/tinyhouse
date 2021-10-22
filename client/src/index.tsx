import React from 'react';
import ReactDOM from 'react-dom';
import { Listings } from './sections';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './styles/index.css';

const client = new ApolloClient({ uri: '/api', cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Listings title="Tinyhouse Listings" />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
