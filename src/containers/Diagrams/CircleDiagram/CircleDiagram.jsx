import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import ZoomViewer from 'components/Core/Diagram/SVG/ZoomViewer';
import { Button } from 'react-md';

import { FieldSet } from 'components/Core';
import { DialogSheet } from 'components/Sheets';
import {useFocus, useStatus, useViewerDimensions} from 'components/Core/Hooks';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child sets.
 */
const CircleDiagram =  ({ id, name, type, meta: metaInit, data = [] } ) => {
  const [{status, message}, updateStatus] = useStatus();
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
    console.log(metadata);
    updateMeta(metadata);
  }

  /**
   * Use our status to determine our render state.
   */
  useEffect(
    () => {
      if ( ! loaded ) {
        console.log(`Circle Diagram Post Render Status: ${status}`);
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
    [focus]
  );

  /**
   * Center the diagram on loaded
   */
  useEffect(
    () => {
      if (Viewer) {
        if ( 'rendering' === status ) {
          Viewer.setPointOnViewerCenter(focus.center.x, focus.center.y, meta.zoom.scale);
        }
      }
    },
    [loaded]
  );


  const handleClick = () => {

  }

  const handleDoubleClick = () => {

  }

  const updateZoom = () => {
  }

  const resetFocus = () => {

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
            width={ meta.attributes.width }
            height={ meta.attributes.height }
            scaleFactor={ meta.zoom.scale }
            ref={(refViewer) => {Viewer = refViewer}}
            onClick={ handleClick }
            onZoom={ updateZoom }
            onDoubleClick={ handleDoubleClick }
          >
            <svg
              id="circlediagram"
              viewBox={`0 0 ${meta.attributes.width} ${meta.attributes.height}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <g id="diagramGroup">
                {
                  data.map((fieldset) => {
                    return(
                      <FieldSet
                        id={ fieldset.id }
                        key={ fieldset.id }
                      />
                    )
                  })
                }
              </g>
            </svg>
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
export default CircleDiagram;
