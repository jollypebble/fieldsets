import React, { createContext, useEffect, useLayoutEffect, useReducer, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Fetch, Initialize, Write } from 'lib/fieldsets/DataCache/calls';
import {useFocus, useStatus, useViewerDimensions, useDefaults} from 'lib/fieldsets/Hooks';

// Our contexts.
export const ControllerContext = createContext([
  {
    interfaces: {},
    meta: {},
    loaded: false
  },
  () => {}
]);

/**
 * This is the generic Fieldset Container which Handles data priming for container types.
 * This component initializes the data cache with data, as well as setting up the underlying coordinate system for tracking interactions.
 */
const Controller = ({children}) => {
  const propTypes = {
    children: PropTypes.node
  };

  const [{status, message, stage}, updateStatus, lifecycle] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const [interfaces, updateInterfaces] = useState({});
  const [containers, updateContainers] = useState({});
  const { height, width } = useViewerDimensions();
  const [defaults, updateDefaults] = useDefaults();

  const [controller, updateController] = useState({
    controller: {
      interface: {},
      interfaces: interfaces,
      containers: containers
    },
    viewer: {
      focus: focus,
      container: {},
      interface: {}
    }
  });

  /**
   * Query the last save of the current container and use it to initialize. Otherwise fallback on defaults defined in 'data/defaults'
   */
  const initController = useCallback(
    async () => {
      // await before instantiating ApolloClient, else queries might run before the cache is persisted
      try {
        let promise = new Promise((resolve, reject) => {
          resolve();
        });
        await promise.then(
          ()=> {
            if ( ! loaded ) {
              updateLoaded(true);
            }
          }
        );
      } catch (error) {
        updateStatus('error', `Initial Data Priming Error: ${error}`, 'controller');
      }
    },
    []
  );

  // Wait For cache connection, and then for data to be primed to fetch results.
  useLayoutEffect(
    () => {
      if ( ! loaded ) {
        if ( 'controller' === stage && !lifecycle.controller.complete) {
          switch (status) {
            case 'setup':
              updateStatus('initializing', 'Initializing Controller data', 'controller');
              initController();
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
  const renderControlled = useMemo(
    () => {
      if (loaded) {
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

  /**
   * After complete transition to container stage.
   */
  useEffect(
    () => {
      if (loaded) {
        updateStatus('setup', 'Controller set up complete. Setting up controlled containers.', 'container');
      }
    },
    [loaded]
  );

  return (
    <ControllerContext.Provider value={[controller, updateController]}>
      {children}
    </ControllerContext.Provider>
  );
}

export default Controller;
