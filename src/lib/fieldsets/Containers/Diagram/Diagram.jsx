import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Container from 'lib/fieldsets/Containers/Container';
import DiagramType from './DiagramType';
import { useStatus, usePortals } from 'lib/fieldsets/Hooks';

/**
 * This is the generic Diagram component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Diagram = ({id, name, type, meta, defaultFocus = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    defaultFocus: PropTypes.bool,
    children: PropTypes.node
  };

  const [{status, message, stage}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const portals = usePortals();
  const viewerPortal = useRef(portals.viewer.portalRef);

  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'loaded' === status && 'container' === stage ) {
          updateLoaded(true);
          updateStatus('rendering', `Rendering ${id}`, 'diagram');
        }
      }
    },
    [status]
  );

  const renderDiagram = useCallback(
    () => {
      if (loaded) {
        return(
          ReactDOM.createPortal(
            <div id={id}>
              <DiagramType
                id={id}
                name={name}
                type={type}
              >
                {children}
              </DiagramType>
            </div>,
            portals.viewer.portalRef
          )
        );
      }
      return null;
    },
    [loaded]
  );

  // TODO: Add in an underlying canvas based X,Y coordinate system which should be more performant for tracking set centers.
  return (
    <React.Fragment>
      <Container
        id={id}
        name={name}
        type={'Diagram'}
        view={type}
        meta={meta}
        defaultFocus={defaultFocus}
      >
        {renderDiagram()}
      </Container>
    </React.Fragment>
  );
}

export default Diagram;
