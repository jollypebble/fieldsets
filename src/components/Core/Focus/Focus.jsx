/**
 * Focus is a react context that allows components to know what the current user focus is and wheter or not the should be visible..
 */
import React, {createContext, useReducer, useState, useLayoutEffect} from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { defaults } from 'graphql/defaults';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {
  fetchFocus,
  updateFocus,
  updateFieldSets
} from 'graphql/queries';

// Our focus context.
export const FocusContext = createContext({});

/**
 * Our focus is a local cache fragement. It uses the id of 'current' for it along with the it's corresponding container.
 */
const FocusHandler = ( {children} ) => {
  const client = getDataCacheService();
  const [container, updateContainer] = useState(defaults.focus.container);

  const [fetchFocusData, focus] = useLazyQuery(fetchFocus, {
    partialRefetch: true,
    client: client,
    onCompleted: () => {
      if ( !(container) || container.containerID !== focus.data.focus.container.containerID) {
        updateContainer(focus.data.focus.container);
        updateContainerData({ variables: { data: focus.data.focus.container } });
      }
    }
  });

  const [updateFocusData] = useMutation(updateFocus, {
    client: client,
    onCompleted: () => {
      fetchFocusData();
    }
  });

  const [updateContainerData] = useMutation(updateFieldSets, {
    client: client,
  });

  /**
   * If we change containers, we need to fetch the fieldsets asscociated with the current focus.
   */
  useLayoutEffect(
    () => {
      fetchFocusData();
    },
    [container]
  );

  // Our reducer to set the focus.
  const setFocus = (current, call = {}) => {

    // Get the latest focus.
    if (call.action) {
      const focusdata = call.data;
      switch (call.action) {
        // change entire container focus
        case 'change':
          current = refocus(focusdata);
          current.container = (focusdata.container) ? focusdata.container : container;
          current.container.__typename = 'JSONObject';
          break;
          // Refocus & update within a container
        case 'refocus':
          current = refocus(focusdata);
          break;
        default:
          break;
      }

      updateFocusData( { variables: { data: current } } );
    }
    return current;
  }

  const refocus = (data) => {
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

  return (
    <FocusContext.Provider value={useReducer( setFocus, defaults.focus )}>
      {children}
    </FocusContext.Provider>
  );
}

export default FocusHandler;
