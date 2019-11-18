import React, {
  createContext,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import PropTypes from 'prop-types';
import {useFocus, useStatus, useDefaults} from 'lib/fieldsets/Hooks';

export const PortalContext = createContext({});

export const Portal = ({type}) => {
  const portalRef = useRef(null);
  const [defaults, updateDefaults] = useDefaults();
  useEffect(
    () => {
      const updated = defaults;
      updated.portals[type].portalRef = portalRef.current;
      updateDefaults( updated );
    },
    []
  );

  return (
    <div
      id={`${type}-portal`}
      className='fieldsets-portal'
      ref={portalRef}
    />
  );
}

/**
 * Portals allow us to asyncronously load data for the aplication and load only the necessary viewer and interface once they are ready.
 * We can utilize status to trigger rendering of all sub components with portals.
 * This Portal handler defines what portals exist and their current status. Each portal represent a stage of the overall application lifecycle.
 */
export const Portals = (props) => {
  const [portals, updatePortals] = useState([]);
  const [defaults, updateDefaults] = useDefaults();
  const [{status,stage,message}, updateStatus, lifecycle] = useStatus();
  const [loaded, updateLoaded] = useState(false);

  /**
   * Add core portals to default list.
   */
  useLayoutEffect(
    () => {
      if ( ! loaded && 'defaults' === stage && ! lifecycle['defaults'].complete) {
        switch(status) {
          case 'initializing':
            // These are our core portals.
            // Portals should contain references to their container elements.
            updateDefaults({
              portals: {
                account: {
                  id: 'account'
                },
                controller: {
                  id: 'controller'
                },
                viewer: {
                  id: 'viewer'
                },
                interface: {
                  id: 'interface'
                },
              }
            });
            break;
          case 'initialized':
            updateLoaded(true);
            break;
          default:
            break;
        }
      }
    },
    [status]
  );

  /**
   * When defaults are changed, make sure we have the latest defined portals.
   */
  const renderPortals = useCallback(
    () => {
      return(
        Object.values(defaults.portals).map(
          (portal) => {
            return(
              <Portal
                key={`${portal.id}-portal`}
                type={portal.id}
              />
            );
          }
        )
      );
    },
    [loaded]
  );

  useEffect(
    () => {
      updatePortals({...defaults.portals})
    },
    [defaults]
  )

  /**
   * Wait until ready before rendering.
   */
  if (!loaded) {
    return null;
  }



  return (
    <React.Fragment>
      {renderPortals()}
      <PortalContext.Provider value={portals}>
        {props.children}
      </PortalContext.Provider>
    </React.Fragment>
  );
}
