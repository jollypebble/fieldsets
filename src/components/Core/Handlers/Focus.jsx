/**
 * Focus is a react context that allows components to know what the current user focus is and wheter or not the should be visible..
 */
import React, {createContext, useReducer, useState, useEffect, useLayoutEffect} from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { defaults } from 'graphql/defaults';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {
  fetchFocus,
  updateFocus,
  updateContainer
} from 'graphql/queries';
import {useStatus} from 'components/Core/Hooks';

// Our focus context.
export const FocusContext = createContext({});

/**
 * Our focus is a local cache fragement. It uses the id of 'current' for it along with the it's corresponding container.
 */
export const Focus = ( {children} ) => {
  const client = getDataCacheService();

  const [{status, message}, updateStatus] = useStatus();

  /**
   * Read the current active focus from the data store
   */
  const [fetchFocusData, focus] = useLazyQuery(fetchFocus, {
    client: client,
    awaitRefetchQueries: true
  });

  /**
   * Update the current active focus in the data store
   */
  const [updateFocusData] = useMutation(updateFocus, {
    client: client,
    awaitRefetchQueries: true
  });

  /**
   * Re-prime the cache data when switching container focus.
   */
  const [updateContainerData] = useMutation(updateContainer, {
    client: client
  });

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: 'focus', status: newStatus, message: newMessage, action: 'update'});
  }

  const setContainer = ( newContainer = false ) => {
    setStatus('refocused', 'Setting new container focus.');
    if (! newContainer ) {
      newContainer = focus.data.focus.container;
    }
    if ( 'default' !== newContainer.containerID ) {
      updateContainerData({ variables: { data: newContainer } });
    }
    return newContainer;
  };

  const getFocus = () => {
    setStatus('focusing', 'Fetching current focus.');
    return fetchFocusData();
  }

  // Our reducer to set the focus.
  const setFocus = (current, call = {}) => {
    // Get the latest focus.
    if (call.action) {
      const focusdata = call.data;
      switch (call.action) {
        // change entire container focus
        case 'refocus':
          current = mergeFocus(focusdata);
          current.container = (focusdata.container) ? focusdata.container : focus.data.focus.container;
          current.container.__typename = 'JSONObject';
          setContainer(current.container);
          break;
        // Change focus withing container.
        case 'focus':
          // Fetch our metadata about our new focus.
          current = mergeFocus(focusdata);
          setStatus('focused', 'Switched focus fieldset.');
          break;
        default:
          break;
      }
      updateFocusData( { variables: { data: current } } );
    }
    return current;
  }

  const mergeFocus = (data) => {
    let newfocus = (focus.data) ? focus.data.focus : defaults.focus;
    newfocus.focusID = (data.focusID) ? data.focusID : newfocus.focusID;
    newfocus.type = (data.type) ? data.type : newfocus.type;
    newfocus.center = (data.center) ? data.center : newfocus.center;
    newfocus.center.__typename = 'JSONObject';
    newfocus.zoom = (data.zoom) ? data.zoom : newfocus.zoom;
    newfocus.zoom.__typename = 'JSONObject';
    newfocus.depth = (data.depth) ? data.depth : newfocus.depth;
    newfocus.__typename = 'Focus';
    return newfocus;
  }

  /**
   * If we change containers, we need to fetch the fieldsets asscociated with the current focus.
   */
  useEffect(
    () => {
      if ( focus && ! focus.loading ) {
        console.log(`Focus Post Render Status: ${status}`);
        switch (status) {
          case 'primed':
          case 'priming':
            if ( ! ( focus.called && focus.data ) ) {
              getFocus();
            }
            break;
          default:
            break;
        }
      }
    },
    [status]
  );

  /**
   * If we change containers, we need to fetch the fieldsets asscociated with the current focus.
   */
  useEffect(
    () => {
      if (focus.called && !(focus.loading) && focus.data.focus.container) {
        setContainer(focus.data.focus.container);
      }
    },
    [focus]
  );


  return (
    <FocusContext.Provider value={useReducer( setFocus, defaults.focus )}>
      {children}
    </FocusContext.Provider>
  );
}
