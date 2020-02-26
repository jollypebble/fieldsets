import React, { Suspense, useState, useCallback, useLayoutEffect, useEffect, useTransition } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useStatus, useController } from 'lib/fieldsets/Hooks';

const Container = React.lazy(() => import('lib/fieldsets/Containers/Container'));
const SheetView = React.lazy(() => import('./SheetView'));

/**
 * This is the generic Diagram component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Sheet = ({id, name, view, meta, visible: isVisible = false, children}) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    view: PropTypes.string,
    meta: PropTypes.object,
    visible: PropTypes.bool,
    children: PropTypes.node
  };

  const stageName = 'render';
  const [{stage, status, message, complete}, updateStatus, lifecycle] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [{containers}, controller] = useController();
  const [visible, updateVisibility] = useState(isVisible);

  const [applyChange, pending] = useTransition({timeoutMs: 5000});

  // We use our controller context to trigger our rendering.
  useEffect(
    () => {
      if ('container' === stage && complete) {
        applyChange(() => {
          updateStatus('initializing', `Initializing diagram ${id}`, stageName);
          updateLoaded(true);
        });
      }
    },
    [stage, status, complete]
  );

  /**
   * Sync controller visibility with current visibility.
   */
  useLayoutEffect(
    () => {
      if (loaded) {
        applyChange( () => {
          updateVisibility(containers[id].visible);
        });
      }
    },
    [containers]
  );

  const renderSheet = useCallback(
    () => {
      if (stageName === stage && visible && loaded && ! pending) {
        return(
          <Suspense fallback={<h1>Rendering sheet sets...</h1>}>
            <div id={id} className="viewer-container">
              <SheetView
                id={id}
                name={name}
                view={view}
                visible={visible}
              >
                {children}
              </SheetView>
            </div>
          </Suspense>
        );
      }
      return null;
    },
    [stage, visible, loaded, pending]
  );

  return (
    <React.Fragment>
      <Suspense fallback={<h1>Loading diagram data...</h1>}>
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
export default Sheet;
