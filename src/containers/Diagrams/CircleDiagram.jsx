import React, { useEffect, useState, useRef } from 'react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { Button } from 'react-md';

import { Set } from 'components/Core';
import { DialogSheet } from 'containers/Sheets';
import {useFocus} from 'components/Core/Hooks';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child sets.
 */
const CircleDiagram =  ({ id, name, type, meta, status, data, updateData } ) => {
  const [dialog, updateDialog] = useState();
  const [focus, updateFocus] = useFocus();

  const {attributes, center, zoom} = meta;


  const timeouts = [];
  const Viewer = useRef();
  let backgroundSheet = useRef();

  const getStandardRadius = (depth = 0) => {
    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 10;
    return (baseradius * 75) / 100 * (0.6 ** depth);
  }

  const getStandardStrokeWidth = (depth = 0) => {
    return getStandardRadius(depth) * 0.5;
  }

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

  return (
    <div className="diagramviewer">
      <div className="viewer">
        <ReactSVGPanZoom
          width={ attributes.width }
          height={ attributes.height }
          background="transparent"
          tool="auto"
          toolbarPosition="none"
          miniaturePosition="none"
          disableDoubleClickZoomWithToolAuto
          scaleFactor={ zoom.scale }
          scaleFactorOnWheel={ 1.06 }
          scaleFactorMin={ 1 }
          ref={ (Viewer) => {
            if (!Viewer) return;
            Viewer.mainG = Viewer.ViewerDOM.getElementsByTagName('g')[0];
            backgroundSheet = Viewer.mainG.getElementsByTagName('rect')[0];
          } }
          onClick={ handleClick }
          onZoom={ updateZoom }
          onDoubleClick={ handleDoubleClick }
        >
          <svg
            id="circlediagram"
            width={ attributes.width }
            height={ attributes.height }
          >
            <defs>
              <clipPath id="clippath">
                <ellipse
                  id="mask ellipse"
                  cx={ 876 }
                  cy={ 471 }
                  rx={ 255 }
                  ry={ 185 }
                />
                <rect
                  id="mask rectangle"
                  x="720"
                  y="235"
                  width="360"
                  height="50"
                />
              </clipPath>
            </defs>
            <g style={ { clipPath: 'url(#clippath)' } } id="diagramGroup">
              {
                /**

                data.fieldsets.map((diagram) => {
                return (
                  <Set
                    key={ diagram.id }
                    setData={ diagram.children || [] }
                    setID={ diagram.id }
                    scaleFactor={ 1 }
                    { ...diagram }
                    center={diagram.meta.data.center}
                    radius={ getStandardRadius() }
                    updateFocus={ updateFocus }
                    resetFocus={ resetFocus }
                    onDoubleClick={ openDialog }
                    closeDialog={ closeDialog }
                    updateSetState={ updateData }
                    visible
                  />
                );
              })
              */
              }
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
      <div className="diagramSheet" />
      <div className="diagramDialogs">
        {dialog && <DialogSheet
          setID={ dialog }
          onClose={ closeDialog }
        />}
      </div>
    </div>
  );
}
export default CircleDiagram;
