import React, { Component, useState } from 'react';
import { Query, withApollo } from "react-apollo";
import { diagramData } from 'config';
import gql from 'graphql-tag';
import {AutoSizer} from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

import { RadialNode } from 'components/Diagrams';
//import { getCurrentFocusQuery } from '../../../graphql';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child nodes.
 */
class CircleDiagram extends Component {
  constructor(props) {
    super(props);

    // Our custom event handling structure
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);

    // Component State
    this.state = {
      currentID: null,
      currentX: this.props.startX,
      currentY: this.props.startY,
      currentZoom: this.props.zoom,
      isZoomed: false
    };

    // Component Specific Methods
    this.setFocus = this.setFocus.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
  }

  /**
   * Component will Mount is used as a one time initialization.
   * We use this to prime our cache for this component.
   */
  componentWillMount() {
    // This also primes our cache.
    this.resetState();
  }

  /**
   * Here we add all of our component specific event listeners and interact with our component.
   */
  componentDidMount() {
    this.addEvents();

    setTimeout(() => {
      this.resetFocus();
    }, 10);
  }

  /**
   * Undo what has been done in WillMount
   */
  componentWillUnmount() {
    this.removeEvents();
  }

  // Any events you add in here should make sure they have a corresponding removal in the removeEvents method
  addEvents = () => {
    // TODO: These events are frowned upon by the react community. But bubbling all the way from the apollo cache is going to be hairy. Fix this at some point.
    document.addEventListener('focusCircleSet', this.updateFocus);
  }

  // Any events you remove in here should make sure they have a corresponding add in the addEvents method
  removeEvents = () => {
    document.removeEventListener('focusCircleSet', this.updateFocus);
  }

  resetState = () => {
    const {
      startX,
      startY,
      zoom
    } = this.props;

    // Write our cache with a non circle starting point
    // This is the data structure that currentFocus is stored as in the apollo cache ad deined in ./graphql/defaults.js.
    const initialFocus = {
      id: null,
      centerX: startX,
      centerY: startY,
      __typename: 'Circle'
    };
    this.props.client.cache.writeData({ data: { currentFocus: initialFocus } });

    // Reset our state
    const state = {
      currentID: null,
      currentX: startX,
      currentY: startY,
      currentZoom: zoom,
      isZoomed: false
    }
    this.setState(state);
  }

  resetFocus = () => {
    const {
      startX,
      startY,
      zoom
    } = this.props;
    this.Viewer.setPointOnViewerCenter(startX, startY, zoom);
    this.setState({ isZoomed: false });
    this.setState({ currentZoom: zoom });
  }

  setFocus = () => {
    const {
      currentID,
      currentX,
      currentY
    } = this.state;
    console.log(`Moving Focus to ${currentX}, ${currentY}`);

    // If we clicked on a circle, Zoom in on it.
    if ( currentID !== null ) {
      // Get the bounding box of the SVG group and zoom in on it.
      // TODO: Passs the groups up from the SVG properly.
      const group = document.querySelector(`#${currentID}-group`);
      const bbox = group.getBBox();

      const bboxX = bbox.x;
      const bboxY = bbox.y;
      const bboxW = bbox.width;
      const bboxH = bbox.height;

      // fitSelection updates zoom state.
      this.Viewer.fitSelection(bboxX, bboxY, bboxW, bboxH);

      // The fitSelection is a little too snug for our tastes, lets scale it back a notch more.
      const currentZoom = this.state.currentZoom;
      const newZoom = (currentZoom - (currentZoom/2.5)) > 200 ? 200 : currentZoom - (1.5 * (currentZoom/2.5)); // 2.5 is the scale factor we pass below. Let's not zoom in above 200. There is no need.
      this.Viewer.setPointOnViewerCenter(currentX, currentY, newZoom);
    }
  }

  updateFocus = (event) => {
    console.log('Diagram Update Focus');
    const focus = this.props.client.readQuery({
      query: gql`
        {
          currentFocus @client {
            id
            centerX
            centerY
          }
        }
      `
    });
    console.log(focus);
    this.setState({ currentID: focus.currentFocus.id });
    this.setState({ currentX: focus.currentFocus.centerX });
    this.setState({ currentY: focus.currentFocus.centerY });
    this.setFocus();
  }

  updateZoom = (event) => {
    this.setState({ currentZoom: event.a });
    this.setState({ isZoomed: true });
  }

  render() {
    const {
      width,
      height,
      startX,
      startY
    } = this.props;

    const {
      currentZoom
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
          scaleFactor={2.5}
          scaleFactorOnWheel={1.1}
          scaleFactorMin={10}
          ref={Viewer => this.Viewer = Viewer}
          onClick={this.resetFocus}
          onZoom={this.updateZoom}
          onDoubleClick={event => console.log(event.x, event.y, event.originalEvent)}
        >
          <svg
            id="circlediagram" width={width} height={height}
          >
            <g id="diagramGroup">
              { diagramData.map(diagram => (
                <RadialNode
                  key={ diagram.id }
                  nodeData={ typeof(diagram.children) === undefined ? [] : diagram.children }
                  nodeID={ diagram.id }
                  centerX={ diagram.centerX }
                  centerY={ diagram.centerY }
                  radius={ radius }
                  ref={(ref) => this.group = ref}
                />
              )) }
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}
export default withApollo(CircleDiagram);
