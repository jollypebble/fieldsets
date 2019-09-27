import React, { useState, useLayoutEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { StatusBar } from 'components/Dialogs/StatusBar';
import { getDataCacheService } from './DataCacheService';
import { Focus } from 'components/Core';

/**
 * Our Data cache wrapper around apollo/graphql, indexDB and PostgreSQL.
 * The data cache is a react-window component that contains all of our fieldsets, subsets and metasets and is used to performantly load large lists of data.
 */
const DataCache = ({children}) => {
  const [status, updateStatus] = useState('initializing');
  const [message, updateMessage] = useState(`Initializng datacache....`);
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
    updateStatus(newStatus);
    updateMessage(newMessage);
  }

  // Asynchronously initialize cache and wait for it to finish.
  useLayoutEffect(
    () => {
      initCache();
    },
    [status]
  );

  if ( 'ready' !== status ) {
    return <StatusBar
      id="datacache-status-bar"
      status={status}
      message={message}
    />;
  }

  client = getDataCacheService();
  return (
    <ApolloProvider client={client}>
      <Focus>
        {children}
      </Focus>
    </ApolloProvider>
  );
}

export default DataCache;
