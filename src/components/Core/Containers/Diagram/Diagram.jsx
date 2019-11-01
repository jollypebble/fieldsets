import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Core/Containers/Container';
import DiagramType from './DiagramType';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import { useStatus, useContainer } from 'components/Core/Hooks';

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

  const [{status}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);

  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'loaded' === status ) {
          updateLoaded(true);
        }
      }
    },
    [status]
  );

  const renderDiagram = useCallback(
    () => {
      if (loaded) {
        return(
          <DiagramType
            id={id}
            name={name}
            type={type}
          >
            {children}
          </DiagramType>
        );
      }
      return null;
    },
    [loaded]
  );

  // TODO: Add in an underlying canvas based X,Y coordinate system which should be more performant for tracking set centers.
  return (
    <Container
      id={id}
      name={name}
      type={'Diagram'}
      view={type}
      meta={meta}
      defaultFocus={defaultFocus}
    >
      <div id={id}>
        {renderDiagram()}
      </div>
    </Container>
  );
}

export default Diagram;
