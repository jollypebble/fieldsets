import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo';
import './static/styles/index.css';
import App from './App';
import { resolvers, defaults, typeDefs } from './graphql';
//import fragments from './graphql/fragmentTypes.json';

const SERVER_URL = 'http://localhost:8000';

// const fragmentMatcher = new IntrospectionFragmentMatcher({ fragments });
// const cache = new InMemoryCache({ fragmentMatcher });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${SERVER_URL}/graphql`
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
