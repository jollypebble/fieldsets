import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
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

/**
 * The Cache Persistore provides the following Methods:
 * DataCacheStore.restore();   // Immediately restore the cache. Returns a Promise.
 * DataCacheStore.persist();   // Immediately persist the cache. Returns a Promise.
 * DataCacheStore.purge();     // Immediately purge the stored cache. Returns a Promise.
 *
 * DataCacheStore.pause();     // Pause persistence. Triggers are ignored while paused.
 * DataCacheStore.resume();    // Resume persistence.
 * DataCacheStore.remove();    // Remove the persistence trigger. Manual persistence required after calling this.
 *
 * // Obtain the most recent 30 persistor loglines.
 * // `print: true` will print them to the console; `false` will return an array.
 * DataCacheStore.getLogs(print);

 * // Obtain the current persisted cache size in bytes. Returns a Promise.
 * // Resolves to 0 for empty and `null` when `serialize: true` is in use.
 * DataCacheStore.getSize();
 */
export const getDataCacheStore = async () => {
  if (! DataCacheStore) {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      DataCacheStore = await new CachePersistor({
        cache,
        storage: localForage,
        key: 'fieldsets-cache-persist',
        debug: true
      });
    } catch (error) {
      console.error('Persistent Data Store Load Error:', error);
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
