/**
 * Focus is a react context that allows components to know what the current user focus is and wheter or not the should be visible..
 */
import React, {createContext, useReducer, useState, useLayoutEffect} from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { defaults } from 'graphql/defaults';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import { useFocus } from 'components/Core/Hooks';
import {
  fetchFieldSets,
  updateFieldSets
} from 'graphql/queries';

// Our focus context.
export const ContainerContext = createContext({});

const Container = ( {children} ) => {
  const client = getDataCacheService();
  const [focus, updateFocus] = useFocus();

  const [fetchDiagramData, { called, loading, error, data, refetch, networkStatus, updateQuery }] = useLazyQuery(fetchFieldSets, {
    notifyOnNetworkStatusChange: true,
    client: client,
    partialRefetch: true
  });

  const [updateContainer] = useMutation(updateFieldSets, {
    client: client,
    onCompleted: () => {
      fetchDiagramData();
    }
  });

  /**
   * If we change containers, we need to fetch the fieldsets asscociated with the current focus.
   */
  useLayoutEffect(
    () => {
      loadContainerFieldSets();
    },
    [focus.container.id]
  );

  const loadContainerFieldSets = () =>  {
    if( focus.container ) {
      const containerFieldSet = callCache({id: focus.container.id, target: focus.container.type, action: 'fetch' });
      updateContainer({ variables: {data: containerFieldSet} });
    }
  }

  // Our reducer to set the diagram data.
  const setContainer = (current, call = {}) => {
    // Get the latest focus.
    if (call) {
      switch (call.action) {
        case 'load':
        default:
          loadContainerFieldSets();
      }
    }
    fetchDiagramData();
    return data;
  }

  return (
    <ContainerContext.Provider value={useReducer( setContainer, defaults.focus.container )}>
      {children}
    </ContainerContext.Provider>
  );
}

export default Container;
