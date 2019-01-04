import React, { Component } from 'react';
import { diagramData } from 'config';
import gql from 'graphql-tag';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

import { RadialNode } from 'components/Diagrams';


export default class CircleDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentX: 30.5,
      currentY: 46
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getToCenter();
    }, 10);
  }

  getToCenter = () => {
    // At this point the viewer has been created. Set a cached reference to the viewer for components to use to move the viewer around.
    const {
      currentX,
      currentY
    } = this.state;
    const {
      zoom
    } = this.props;
    this.Viewer.setPointOnViewerCenter(currentX, currentY, zoom);
  }

  render() {
    const {
      width,
      height
    } = this.props;

    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 2;
    const radius = (baseradius*75)/100;

    // const circleData = this.calculateNodeCenters(diagramData);
    return (
      <div className="diagramviewer">
        <ReactSVGPanZoom
          width={width}
          height={height}
          background='transparent'
          tool='auto'
          toolbarPosition='none'
          miniaturePosition='none'
          disableDoubleClickZoomWithToolAuto={true}
          scaleFactor={2.5}
          scaleFactorOnWheel={1.1}
          ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log(event.x, event.y, event.originalEvent)}
          onDoubleClick={event => console.log(event.x, event.y, event.originalEvent)}
        >
          <svg
            id="circlediagram" width={width} height={height}
          >
            <g id="diagramGroup">
              { diagramData.map(data => (
                <RadialNode
                  key={ data.id }
                  nodeData={ typeof(data.children) === undefined ? [] : data.children }
                  nodeID={ data.id }
                  startx={ data.startx }
                  starty={ data.starty }
                  radius={ radius }
                  ref={Viewer => this.Viewer = Viewer}
                />
              )) }
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
