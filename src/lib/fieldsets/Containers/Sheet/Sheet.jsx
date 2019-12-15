import React, { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Container from 'lib/fieldsets/Containers/Container';
import SheetType from './SheetType';
import SheetView from './SheetView';
import { useStatus, usePortals, useController } from 'lib/fieldsets/Hooks';

/**
 * This is the generic Diagram component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Spreadsheet = ({id, name, type, view, meta, visible = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    view: PropTypes.string,
    meta: PropTypes.object,
    visible: PropTypes.bool,
    children: PropTypes.node
  };

  const [{stage, status, message}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const portals = usePortals();
  const [containers, controller] = useController();

  useEffect(
    () => {
      if ( ! loaded ) {
        if ( 'loaded' === status && 'container' === stage && 'loaded' === containers[id].status) {
          updateLoaded(true);
          updateStatus('rendering', `Rendering ${id}`, 'sheet');
        }
      }
    },
    [status]
  );

  const renderSheet = useCallback(
    () => {
      if (loaded && portals && portals.viewer && portals.viewer.portalRef ) {
        return(
          ReactDOM.createPortal(
            <div id={id}>
              <SheetView
                id={id}
                name={name}
                view={view}
              >
                {children}
              </SheetView>
            </div>,
            portals.viewer.portalRef
          )
        );
      }
      return null;
    },
    [loaded, portals]
  );

  return (
    <React.Fragment>
      <Suspense fallback={<h1>Loading sheet data...</h1>}>
        <Container
          id={id}
          name={name}
          type={'sheet'}
          view={view}
          meta={meta}
          visible={visible}
        >
          {renderSheet()}
        </Container>
      </Suspense>
    </React.Fragment>
  );
}

export default Spreadsheet;
