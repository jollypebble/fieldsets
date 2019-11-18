import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { ApolloProvider } from 'react-apollo';
import { getDataCacheService, getDataCacheStore } from './DataCacheService';
import { useStatus, useDefaults } from 'lib/fieldsets/Hooks';
import { resolvers, typeDefs } from 'lib/fieldsets/graphql';

/**
 * Our Data cache wrapper around apollo/graphql, indexDB and PostgreSQL.
 * The data cache is a react component that contains all of our fieldsets, subsets and metasets and is used to performantly load large lists of data.
 */
const DataCache = ({children}) => {
  const [{status, message, stage}, updateStatus, lifecycle] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [defaults, updateDefaults] = useDefaults();

  // Allow us to use our defaults Hook and have an globally scoped datacacheservice as well.
  const config = useMemo(
    () => {
      return({resolvers: resolvers(defaults), typeDefs: typeDefs(defaults), defaults: defaults})
    },
    [defaults]
  );

  const initCache = async () => {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      await getDataCacheService(config);
      if ( ! loaded ) {
        updateStatus('connected', 'Cache connected!', 'datacache');
        updateLoaded(true);
      }
    } catch (error) {
      updateStatus('error', `Data Cache Load Error: ${error}`, 'datacache');
    }
    return getDataCacheService(config);
  }


  // Initialize cache and wait for it to finish.
  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'defaults' === stage && 'initialized' === status && ! lifecycle.defaults.complete ) {
          // Take handoff from default initialization.
          // Our defaults stage is complete so lets trigger that here.
          updateStatus('initializing', 'Initializing data cache...', 'datacache');
        }
      }
    },
    [status, stage]
  );

  // This should only fire on the stage switches
  useEffect(
    () => {
      if ( ! loaded ) {
        if ('datacache' === stage && 'initializing' === status && ! lifecycle.datacache.complete) {
          initCache();
       }
     }
    },
    [stage]
  );

  // Set our next stage in the lifecycle.
  useEffect(
    () => {
      if ( loaded ) {
        if ( 'datacache' === stage && 'connected' === status && ! lifecycle.datacache.complete) {
          // Transition to new stage. Which is the controller after the datacache is connected.
          updateStatus('setup', 'Setting up Interface Controller', 'controller');
        }
      }
    },
    [loaded]
  );


  if (loaded) {
    return (
      <ApolloProvider client={getDataCacheService(config)}>
        {children}
      </ApolloProvider>
    );
  }
  return null;
};

export default DataCache;
