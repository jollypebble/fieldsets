import React, { useState, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { getDataCacheService } from './DataCacheService';
import { FocusHandler } from 'components/Core';
import { StatusBar } from 'components/Core';
import { useStatus } from 'components/Core/Hooks';


/**
 * Our Data cache wrapper around apollo/graphql, indexDB and PostgreSQL.
 * The data cache is a react-window component that contains all of our fieldsets, subsets and metasets and is used to performantly load large lists of data.
 */
const DataCache = ({children}) => {
  const [{status, message, visible}, updateStatus] = useStatus();
  let client;

  const initCache = async () => {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      client = await getDataCacheService();
    } catch (error) {
      setStatus('error', `Data Cache Load Error: ${error}`);
    }
    setStatus('ready');
  };

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({status: newStatus, message: newMessage, action: 'update'});
  }

  // Asynchronously initialize cache and wait for it to finish.
  useEffect(
    () => {
      if ( 'initializing' === status ) {
        initCache();
      }
    },
    [status]
  );

  client = getDataCacheService();
  return (
    <ApolloProvider client={client}>
      <FocusHandler>
        <StatusBar
          status={'initializing'}
          message={'Initializng datacache....'}
          visible={true}
        />
        {children}
      </FocusHandler>
    </ApolloProvider>
  );
}

export default DataCache;
