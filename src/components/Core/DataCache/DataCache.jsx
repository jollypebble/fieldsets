import React, { useState, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { getDataCacheService, getDataCacheStore } from './DataCacheService';
import { useStatus } from 'components/Core/Hooks';

/**
 * Our Data cache wrapper around apollo/graphql, indexDB and PostgreSQL.
 * The data cache is a react component that contains all of our fieldsets, subsets and metasets and is used to performantly load large lists of data.
 */
const DataCache = ({children}) => {
  const [{status}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);

  const initCache = async () => {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      await getDataCacheService();
      setStatus('connected');
    } catch (error) {
      setStatus('error', `Data Cache Load Error: ${error}`);
    }
    return getDataCacheService();
  }

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: 'datacache', status: newStatus, message: newMessage, action: 'update'});
  }

  const connect = () => {
    if ( getDataCacheService() ) {
      setStatus('connected', 'Cache connected!');
      updateLoaded(true);
    } else {
      setStatus('connecting', 'Trying datacache connection...');
    }
  }

  // Asynchronously initialize cache and wait for it to finish.
  useEffect(
    () => {
      if ( ! loaded ) {
        switch (status) {
          case 'default':
            initCache();
            setStatus('initializing', 'Initializing data cache...');
            connect();
            break;
          default:
            connect();
            break;
        }
      }
    },
    [status]
  );

  if (loaded) {
    return (
      <ApolloProvider client={getDataCacheService()}>
        {children}
      </ApolloProvider>
    );
  }
  return null;
};

export default DataCache;
