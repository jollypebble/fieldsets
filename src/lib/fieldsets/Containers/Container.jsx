import React, { createContext, useEffect, useLayoutEffect, useReducer, useCallback, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { getDataCacheService } from 'lib/fieldsets/DataCache/DataCacheService';
import { callCache } from 'lib/fieldsets/DataCache/reducers/datacache';
import { Fetch, Initialize, Write } from 'lib/fieldsets/DataCache/calls';
import {
  fetchContainerData
} from 'lib/fieldsets/graphql/queries';
import {useFocus, useStatus, useViewerDimensions, useDefaults, useController} from 'lib/fieldsets/Hooks';
import { isPrimitive } from 'lib/fieldsets/utils';
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
const Container = ({id, name, type, view, meta: metadata, defaultFocus = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    view: PropTypes.string,
    meta: PropTypes.object,
    defaultFocus: PropTypes.bool,
    children: PropTypes.node
  };

  const [controller, updateController, prerender] = useController();
  const [{status, message, stage}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const [fieldsets, updateFieldSets] = useState([]);
  const [meta, updateMeta] = useState(metadata);
  const { height, width } = useViewerDimensions();
  const [defaults, updateDefaults] = useDefaults();

  const [containerData, updateContainerData] = useState({fieldsets, meta, loaded});

  const [fetchContainerFieldSets, { loading, called, data, refetch }] = useLazyQuery(fetchContainerData, {
    displayName: `fetchContainerFieldSets ${id}`,
    client: getDataCacheService(),
    onCompleted: (result) => {
      if (!loaded && result.fetchContainerData && result.fetchContainerData.length > 0) {
        updateFieldSets(result.fetchContainerData);
        updateStatus('loaded', 'Cache data sucessfully loaded. Ready for rendering.');
      }
    }
  });

  /**
   * Execute our lazyQuery before rendering.
   */
  useEffect(
    () => {
      if (!loaded && !called && !loading && 'primed' === status) {
        fetchContainerFieldSets();
      }
    },
    [loaded, loading, called, data, status]
  );

  /**
   * Once loaded Watch for container changes.
   */
  useEffect(
    () => {
      if ( loaded && !called && !loading && focus.container.containerID === id) {
        refetch();
      }
    },
    [focus.container.containerID]
  );


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
    if (focus & focus.data && focus.data.length > 0) {
      console.log(`${id} is active focus`);
      return id === focus.data.focus.container;
    }
    return false;
  }

  /**
   * Query the last save of the current container and use it to initialize. Otherwise fallback on defaults defined in 'data/defaults'
   */
  const initContainer = useCallback(
    async () => {
      // await before instantiating ApolloClient, else queries might run before the cache is persisted
      try {
        let promise = new Promise((resolve, reject) => {
          resolve( Initialize({key: id, id: view, name: name, meta: meta, target: type, defaults: defaults}));
        });
        await promise.then(
          ()=> {
            updateStatus('primed', 'Cache primed from defaults', 'container');
          }
        );
      } catch (error) {
        updateStatus('error', `Initial Data Priming Error: ${error}`, 'container');
      }
    },
    []
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
              Write({id: fragment.id, target: target}, {...fragment} );
            }
          });
          updateStatus('primed', 'Cache primed from persistant store', 'container');
        } else {
          initContainer();
        }
      }
    );
  },
  []
);

  // Wait For cache connection, and then for data to be primed to fetch results.
  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'container' === stage ) {
          switch (status) {
            case 'setup':
              updateStatus('priming', `Priming ${name} Data Cache`, 'container');
              loadContainer();
              break;
            case 'primed':
              // If this container is flagged as load as default focus, add it to the root query.
              if (defaultFocus || isActive()) {
                const containerMeta = Fetch({id: id, target: 'meta'});
                // Make sure our current meta has all the defaults backfilled.
                updateMeta({...containerMeta});
                // Set the data for this container;
                const center = (containerMeta.data.center) ? containerMeta.data.center : { x: width/2, y: height/2 };
                const zoom = (containerMeta.data.zoom) ? containerMeta.data.zoom : { scale: 1.0 };
                const container = { containerID: id, type: containerMeta.type };
                updateFocus({ action: 'switch', data: { id: 'current', focusID: id, focusGroup: '', expanded: false, type: containerMeta.type, container: {...container}, center: center, zoom: zoom, depth: 0 }});
              }
              break;
            case 'loaded':
              updateLoaded(true);
              break;
            default:
              break;
          }
        }
      }
    },
    [status, stage, loaded]
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
