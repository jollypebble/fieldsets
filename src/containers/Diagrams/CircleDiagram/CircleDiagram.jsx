import React, { Component } from 'react';
import { diagramData } from 'config';
import { ReactSVGPanZoom, TOOL_NONE, fitSelection, zoomOnViewerCenter, fitToViewer } from 'react-svg-pan-zoom';

import RadialNode from './RadialNode';

export default class CircleDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      diagramData: diagramData,
      showChildren: true,
      width: 1920,
      height: 1080
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getToCenter();
    }, 10);
  }

  getToCenter = () => {
    document.documentElement.scrollLeft = (document.body.scrollWidth - document.body.clientWidth) / 2;
  }

  showChildren = (e) => {
    this.setState(state => ({
      isVisible: !state.isVisible
    }));
    e.preventDefault();
  }

  handleCollapse = () => {
    this.setState({
      showChildren: !this.state.showChildren
    }, () => {
      this.getToCenter();
    });
  }

  render() {
    const {
      diagramData,
      width,
      height
    } = this.state;

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
          ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log(event.x, event.y, event.originalEvent)}
        >
          <svg
            id="circlediagram" width={width} height={height}
          >
            { diagramData.map(data => (
              <RadialNode
                key={ data.id }
                nodeData={ typeof(data.children) === undefined ? [] : data.children }
                nodeID={ data.id }
                startx={ data.startx }
                starty={ data.starty }
                radius={ radius }
              />
            )) }
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
