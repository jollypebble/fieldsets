import React from 'react';
import { render } from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { split } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import 'static/styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();

const defaults = {
  currentX: 30.5,
  currentY: 46,
  currentZoom: 30,
  lastX: 30.5,
  lastY: 46,
  lastZoom: 30,
};

const resolvers = {
  Mutation: {
    focusCircle: (_,{ currentX, currentY, currentZoom }, { cache }) => {
      cache.writeData({ data: {
        currentX: currentX,
        currentY: currentY,
        currentZoom: currentZoom
      } });
      return null;
    }
  }
}

const stateLink = withClientState({ resolvers, cache, defaults });

// Create an http link:
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/subscriptions`,
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({ link: ApolloLink.from([stateLink, httpLink]), cache });

render(
  (<ApolloProvider client={client}>
    <App />
  </ApolloProvider>),
  document.getElementById('root')
);

registerServiceWorker();
