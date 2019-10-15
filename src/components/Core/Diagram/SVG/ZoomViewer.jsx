import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import {
  UncontrolledReactSVGPanZoom,
  setPointOnViewerCenter,
  zoomOnViewerCenter,
  zoom,
  fitSelection,
  fitToViewer
} from 'react-svg-pan-zoom';

const ZoomViewer = (props,ref) => {
  const Viewer = useRef(null);
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return Viewer.current.getValue();
    },
    zoom: (x, y, scale) => {
      return Viewer.current.zoom(x, y, scale);
    },
    zoomOnViewerCenter: (scale) => {
      return Viewer.current.zoomOnViewerCenter(scale);
    },
    setPointOnViewerCenter: (x, y, zoom) => {
      return Viewer.current.setPointOnViewerCenter(x, y, zoom);
    },
    fitSelection: (x, y, width, height) => {
      return Viewer.current.fitSelection(x, y, width, height);
    } ,
    fitToViewer: () => {
      return Viewer.current.fitToViewer();
    }
  }));
  return (
    <UncontrolledReactSVGPanZoom
      background="white"
      tool="auto"
      toolbarProps={{
        position: "none"
      }}
      miniatureProps={{
        position: "none"
      }}
      detectAutoPan={false}
      disableDoubleClickZoomWithToolAuto
      scaleFactorMin={ 1 }
      {...props}
      ref={Viewer}
    >
      {props.children}
    </UncontrolledReactSVGPanZoom>
  );
}
export default forwardRef(ZoomViewer);
