import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo';
import './static/styles/index.css';

import { Config } from './config';
import App from './App';
import { resolvers, defaults, typeDefs } from './graphql';

const GRAPHQL_SERVER = Config.servers.graphql;

const cache = new InMemoryCache();

// await before instantiating ApolloClient, else queries might run before the cache is persisted
await persistCache({
  cache,
  storage: window.localStorage,
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${GRAPHQL_SERVER}/graphql`
  }),
  cache,
  resolvers,
  typeDefs,
});

cache.writeData({
  data: defaults
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
