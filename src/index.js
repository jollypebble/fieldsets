import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import 'static/styles/index.css';
import App from './App';
import { resolvers, defaults } from 'resolvers/resolvers';

const cache = new InMemoryCache();

const typeDefs = `
  type CurrentFocus{
    id: String
    currentX: Float
    currentY: Float
    lastX: Float
    lastY: Float
  }
  
  type Circle {
    id: String!
    isMouseInside: Boolean!
    isFocused: Boolean!
    isActive: Boolean!
    centerX: Float!
    centerY: Float!
  }

  type Mutation {
    focusCircle(text: String!): Circle
    editCircle(id: Int!): Circle
  }

  type Query {
    currentX: Float,
    currentY: Float,
    lastX: Float,
    lastY: Float,
  }
`;

const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
