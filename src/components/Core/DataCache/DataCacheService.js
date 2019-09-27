import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo';
import introspectionQueryResultData from 'fragmentTypes.json';
import localForage from 'localforage';

import { defaults } from 'graphql/defaults';
import { resolvers } from 'graphql/resolvers';
import { typeDefs } from 'graphql/typeDefs';

import { Config } from 'config/config';
const GRAPHQL_SERVER = Config.servers.graphql;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

let cache = new InMemoryCache({ fragmentMatcher });

let DataCacheService;
let DataCacheStore;

const getDataCacheStore = async () => {
  if (! DataCacheStore) {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      DataCacheStore = await new CachePersistor({
        cache,
        storage: localForage,
      });
    } catch (error) {
      console.error('Data Cache Load Error:', error);
    }
  }
  return DataCacheStore;
}

/**
 * Instantiate our datacache service so we can access it outside of a component if needed.
 */
export const getDataCacheService = () => {
  if (! DataCacheService) {
    getDataCacheStore();
    DataCacheService = new ApolloClient({
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
  }

  return DataCacheService;
}
