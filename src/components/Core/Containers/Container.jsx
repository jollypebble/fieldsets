import React, { createContext, useEffect, useLayoutEffect, useReducer, useCallback, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { defaults } from 'graphql/defaults';
import { getDataCacheService, getDataCacheStore } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {
  fetchContainerData
} from 'graphql/queries';
import {useFocus, useStatus, useViewerDimensions} from 'components/Core/Hooks';
import { isPrimitive } from 'components/Core/utils';
import localForage from 'localforage';

// Our contexts.
export const ContainerContext = createContext([
  {
    fieldsets: [],
    meta: {},
    loaded: false
  },
  () => {}
]);

/**
 * This is the generic Fieldset Container which Handles data priming for container types.
 * This component initializes the data cache with data, as well as setting up the underlying coordinate system for tracking interactions.
 */
const Container = ({id, name, type, view, meta, defaultFocus = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    defaultFocus: PropTypes.bool,
    children: PropTypes.node
  };

  const [{status, message}, updateStatus] = useStatus();
  const [connected, updateConnected] = useState(false);
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const [fieldsets, updateFieldSets] = useState([]);
  const { height, width } = useViewerDimensions();

  const [containerData, updateContainerData] = useState({fieldsets, meta, loaded});

  const [fetchContainerFieldSets, { called, data }] = useLazyQuery(fetchContainerData, {
    client: getDataCacheService(),
    awaitRefetchQueries: true
  });

  const getContainerData = useCallback(
    () => {
      updateContainerData({fieldsets, meta, loaded})
      return(
        {fieldsets, meta, loaded}
      );
    },
    [fieldsets, meta, loaded]
  );

  const isActive = () => {
    return id === focus.data.focus.container;
  }

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: id, status: newStatus, message: newMessage, action: 'update'});
  }

  /**
   * Query the last save of the current container and use it to initialize. Otherwise fallback on defaults defined in 'data/defaults'
   */
  const initContainer = useCallback(
    async () => {
      // await before instantiating ApolloClient, else queries might run before the cache is persisted
      try {
        // If the persistor was paused in the loadContainer callback, this ensure it has resumed for initial seeding.
        let promise = new Promise((resolve, reject) => {
          resolve( callCache({key: id, id: view, name: name, meta: meta, target: type, action: 'initialize'}) );
        });
        await promise.then(
          setStatus('primed')
        );
      } catch (error) {
        setStatus('error', `Initial Data Priming Error: ${error}`);
      }
    }, []
  );

  /**
   * Check our data store for a previous persistant save.
   */
  const loadContainer = useCallback( async () => {
    // Check localforage for a saved state and use that instead of defaults.
    // TODO: Make this generic so we can swith to Ionic potentially since it does both web and mobile local storage.
    // TODO: Fetch data from remote source and populate locally.
    await localForage.getItem('fieldsets-datacache-persist',
      async (err, value) => {
        if (value && value.length) {
          const store = JSON.parse(value);
          Object.keys(store).forEach( key => {
            const fragment = { ...store[key] };
            if (fragment.id) {
              Object.keys(fragment).forEach( prop => {
                if ( ! isPrimitive( fragment[prop] )) {
                  const fragmentData = {...fragment[prop]};
                  if (fragmentData.type) {
                    switch (fragmentData.type) {
                      case 'json':
                        if ( fragmentData.json && Array.isArray(fragmentData.json)) {
                          fragment[prop] = [...fragmentData.json];
                        } else {
                          fragment[prop] = {...fragmentData.json}
                        }
                        break;
                      case 'id':
                      default:
                        if ( fragmentData.id && store[fragmentData.id] && store[fragmentData.id].__typename && fragmentData.typename && fragmentData.typename === store[fragmentData.id].__typename ) {
                          const storefragment = {...store[fragmentData.id]};
                          // Handle meta data
                          if (storefragment.data && storefragment.data.json && 'json' === storefragment.data.type) {
                            fragment[prop] = { ...storefragment, data: { ...storefragment.data.json } };
                          } else {
                            fragment[prop] = { ...storefragment };
                          }
                        }
                        break;
                    }
                  }
                }
              });
              const target = fragment.__typename.toLowerCase();
              callCache({id: fragment.id, target: target, action: 'write'}, {...fragment} );
            }
          });
          setStatus('primed');
        } else {
          initContainer();
        }
      }
    );
  },
  []
);


  // Ensure our service is started.
  useLayoutEffect(
    () => {
      getDataCacheService();
    },
    []
  );

  // Wait For cache connection, and then for data to be primed to fetch results.
  useEffect(
    () => {
      if ( ! loaded ) {
        switch (status) {
          case 'connected':
            setStatus('priming', `Priming ${name} Data Cache`);
            loadContainer();
            updateConnected(true);
            break;
          case 'primed':
            // If this container is flagged as load as default focus, add it to the root query.
            if (defaultFocus || isActive()) {
              const containerMeta = callCache({id: id, target: 'meta', action: 'fetch'});
              // Set the data for this container;
              const center = (containerMeta.data.center) ? containerMeta.data.center : { x: width/2, y: height/2 };
              const zoom = (containerMeta.data.zoom) ? containerMeta.data.zoom : { scale: 1.0 };
              const container = { containerID: id, type: containerMeta.type };
              updateFocus({ action: 'switch', data: { id: 'current', focusID: id, focusGroup: '', expanded: false, type: containerMeta.type, container: {...container}, center: center, zoom: zoom, depth: 0 }});
            }
            break;
          default:
            break;
        }
      }
    },
    [status, loaded]
  );

  /**
   * Fieldsets contain default information and relationships about the current container.
   * The only time the fieldset data changes is on changing containers.
   */
  useEffect(
    () => {
      if ('loaded' === status) {
        if ( ! loaded && fieldsets && fieldsets.length ) {
          updateLoaded(true);
        } else {
          updateLoaded(false);
        }
      }
    },
    [fieldsets]
  );

  /**
   * Watch for container changes.
   */
  useEffect(
    () => {
      if ( ! loaded ) {
        if ( focus.container.containerID === id && 'diagram' === focus.container.type) {
          if ( ! called && 0 === fieldsets.length ) {
            fetchContainerFieldSets();
          }
        }
      }
    },
    [focus.container.containerID]
  );

  /**
   * Waiting for data to return
   */
  useEffect(
    () => {
      if (data && data.fetchContainerData.length) {
        setStatus('loaded');
        updateFieldSets(data.fetchContainerData);
      }
    },
    [data]
  );

  // Don't render children til data has been loaded.
  const renderContainer = useMemo(
    () => {
      if (loaded) {
        getContainerData();
        return (
          <React.Fragment>
            {children}
          </React.Fragment>
        );
      }
      return null;
    },
    [loaded]
  );

  return (
    <ContainerContext.Provider value={getContainerData}>
      {renderContainer}
    </ContainerContext.Provider>
  );

}

export default Container;
