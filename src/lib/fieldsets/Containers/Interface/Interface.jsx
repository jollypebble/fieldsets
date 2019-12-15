import React, { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useStatus, useController, usePortals } from 'lib/fieldsets/Hooks';
const Container = React.lazy(() => import('lib/fieldsets/Containers/Container'));
const InterfaceType = React.lazy(() => import('./InterfaceType'));

/**
 * This is the generic Interface component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Interface = ({id, name, type, meta, portal = 'interface', visible = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    visible: PropTypes.boolean,
    children: PropTypes.node
  };

  const [{stage, status, message}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const portals = usePortals();
  const [containers, controller] = useController();

  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'loaded' === status && 'container' === stage && 'ready' === containers[id].status) {
          updateLoaded(true);
          updateStatus('rendering', `Rendering ${id}`, 'interface');
        }
      }
    },
    [status]
  );

  const renderInterface = useCallback(
    () => {
      if (visible && loaded && portals && portals[portal] && portals[portal].portalRef ) {
        console.log(portals);
        return(
          ReactDOM.createPortal(
            <InterfaceType
              id={id}
              name={name}
              type={type}
            >
              {children}
            </InterfaceType>,
            portals[portal].portalRef
          )
        );
      }
      return null;
    },
    [loaded, portals]
  );


  return(
    <React.Fragment>
      {children}
      <Suspense fallback={<h1>{`loading ${portal} data ...`}</h1>}>
        <Container
          id={id}
          name={name}
          type={'interface'}
          view={type}
          meta={meta}
          visible={visible}
        >
          {renderInterface()}
        </Container>
      </Suspense>

    </React.Fragment>
  );
}

export default Interface;
