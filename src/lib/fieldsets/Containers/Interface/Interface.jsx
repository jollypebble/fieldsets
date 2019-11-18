import React, { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Container from 'lib/fieldsets/Containers/Container';
import InterfaceType from './InterfaceType';
import { useStatus, useController, usePortals } from 'lib/fieldsets/Hooks';

/**
 * This is the generic Interface component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Interface = ({id, name, type, meta, visible, defaultFocus = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    visible: PropTypes.boolean,
    defaultFocus: PropTypes.bool,
    children: PropTypes.node
  };

  const [{status, message, stage}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const portals = usePortals();
  const controller = useController();

  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'loaded' === status && 'container' === stage ) {
          updateLoaded(true);
          updateStatus('rendering', `Rendering ${id}`, 'interface');
        }
      }
    },
    [stage, status, loaded]
  );


  const renderInterface = useCallback(
    () => {
      if (loaded) {
        return(
          ReactDOM.createPortal(
            <InterfaceType
              id={id}
              name={name}
              type={type}
            />,
            portals.interface.portalRef
          )
        );
      }
      return null;
    },
    [loaded]
  );


  return(
    <React.Fragment>
      {children}
      <Container
        id={id}
        name={name}
        type={'Interface'}
        view={type}
        meta={meta}
        defaultFocus={defaultFocus}
      >
        {renderInterface()}
      </Container>
    </React.Fragment>
  );
}

export default Interface;
