import React, { useLayoutEffect, useEffect, useState } from 'react';
import ZoomViewer from 'components/Core/Diagram/SVG/ZoomViewer';

import { FieldSet } from 'components/Core';
import { DialogSheet } from 'components/Sheets';
import {useFocus, useStatus, useViewerDimensions, useClickEvents} from 'components/Core/Hooks';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * This is the container for zoom diagrams. It has direct access to the apollo cache so it can track foucs of it's child sets.
 */
const DiagramViewer =  ({ default: id, meta: metaInit, children } ) => {
  const [{status}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const { height, width } = useViewerDimensions();

  const [dialog, updateDialog] = useState({
    id: focus.focusID
  });

  const [meta, updateMeta] = useState(metaInit);
  let Viewer = null;

  /**
   * Our generic status helper function to improve code readability.
   */
  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: id, status: newStatus, message: newMessage, action: 'update'});
  }

  /**
   * A helper function to set the dialog and the focus concurrently..
   */
  const changeFocus = (newfocus) => {
    const focusmeta = callCache({id: newfocus.focusID, target: 'meta', action: 'fetch', filter: 'data'});
    newfocus.center = focusmeta.center;
    newfocus.zoom = focusmeta.zoom;
    updateFocus({action: 'focus', data: newfocus});
    updateDialog({id: newfocus.focusID});
  }

/**
 * A helper function that alters the meta data based on current viewport width and sets diagram units based on that.
 */
  const setDiagramMeta = (metadata) => {
    // Update our diagram meta to include some calculated units and use the most recent viewport dimenions.
    let attributes = metadata.attributes;

    // Set our height based on the current veiwport.
    attributes.width = width;
    attributes.height = height;

    metadata.attributes = attributes;
    updateMeta(metadata);
  }

  /**
   * Use our status to determine our render state.
   */
  useEffect(
    () => {
      if ( ! loaded ) {
        console.log(status);
        switch (status) {
          case 'loaded':
            setStatus('rendering', `Rendering ${id}`);
            let diagrammeta = callCache({id: id, target: 'meta', action: 'fetch'});
            setDiagramMeta(diagrammeta.data);
            break;
          case 'rendering':
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
   * Once loaded, swap our focus.
   */
  useLayoutEffect(
    () => {
      switch (status) {
        case 'rendering':
          // Set our default focus.
          if (meta.focus) {
            changeFocus(meta.focus);
          }
          break;
        default:
          break;
      }
    },
    [loaded]
  );

  /**
   * Watch for focus changes.
   */
  useEffect(
    () => {
      updateDialog({id: focus.focusID});
    },
    [focus.focusID]
  );

  /**
   * Pan to new center.
   */
  useLayoutEffect(
    () => {
      if (Viewer) {
        switch (status) {
          case 'rendered':
            Viewer.setPointOnViewerCenter(focus.center.x, focus.center.y, focus.zoom.scale);
            break;
          case 'resetting':
            Viewer.setPointOnViewerCenter(meta.focus.center.x, meta.focus.center.y, meta.zoom.scale);
            setStatus('rendered');
            break;
          default:
            break;
        }
      }
    },
    [focus.center]
  );

  /**
   * Center the diagram on loaded
   */
  useEffect(
    () => {
      if (Viewer) {
        if ( 'focused' === status ) {
          Viewer.setPointOnViewerCenter(focus.center.x, focus.center.y, meta.zoom.scale);
        }
      }
    },
    [loaded, status]
  );


  const onClick = () => {

  }

  const onDoubleClick = () => {
    resetFocus();
  }

  // Our hook for registering clicks and double clicks separately.
  const [handleClick, handleDoubleClick] = useClickEvents(onClick, onDoubleClick);

  /**
   * Triggered when using wheel or pinch (manual zoom only, not programatically).
   */
  const handleZoom = () => {
    // console.log('Zooming')
  }

  /**
   * Triggered when canvas is moved (including programatically).
   */
  const handlePan = () => {
    // console.log('Panning')
  }

  const resetFocus = () => {
    setStatus('resetting');
    changeFocus(meta.focus);
  }

  const openDialog = () => {

  }

  const closeDialog = () => {

  }

  if ( loaded ) {
    return (
      <div className="diagramviewer">
        <div className="viewer">
          <ZoomViewer
            width={ width }
            height={ height }
            scaleFactor={ meta.zoom.scale }
            ref={(refViewer) => {Viewer = refViewer}}
            onClick={ handleClick }
            onDoubleClick={ handleDoubleClick }
            onPan={ handlePan }
            onZoom={ handleZoom }
          >
            {children}
          </ZoomViewer>
        </div>
        <div className="diagramSheet" />
        <div className="diagramDialogs">
          { dialog &&
            <DialogSheet
            id={ dialog.id }
            onClose={ closeDialog }
            />
          }
        </div>
      </div>
    );
  }
  return null;
}
export default DiagramViewer;
