import React, { Component, useState } from 'react';
import { Query, withApollo } from "react-apollo";
import { diagramData } from 'config';
import gql from 'graphql-tag';
import {AutoSizer} from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

//import { Diagram, DiagramCache } from 'containers/Diagrams/Diagram';
import { RadialNode, RadialDialog } from 'components/Diagrams';
//import { getCurrentFocusQuery } from '../../../graphql';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child nodes.
 */
class CircleDiagram extends Component {
  constructor(props) {
    super(props);

    // Component State
    this.state = {
      currentID: null,
      currentX: this.props.startX,
      currentY: this.props.startY,
      currentZoom: this.props.zoom,
      nodes: {},
      currentDialog: '',
      isZoomed: false,
      isDblClick: false,
      mouseInCircle: false
    };

    // Component Specific Methods
    this.setFocus = this.setFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.cacheIsSet = this.cacheIsSet.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.Viewer = React.createRef();
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
    this.resetFocus();
  }

  handleClick = (event) => {
    //console.log(event.x, event.y, event.originalEvent);
  }

  handleDoubleClick = (event) => {
    //console.log(event.x, event.y, event.originalEvent);
  }


  resetState() {
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

  resetFocus() {
    console.log( 'Diagram Reset' );
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
    //console.log( 'Diagram Moving Viewer Focus' );
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
    } else {
      this.resetFocus();
    }
  }

  cacheIsSet = (vars) => {
    const p = new Promise( (resolve) => {
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
      if ( focus.currentFocus.id === vars.id && focus.currentFocus.centerX === vars.centerX && focus.currentFocus.centerY === vars.centerY ) {
        resolve(vars);  // fulfilled successfully
      }
    });
    return p;
  }

  // TODO: Non-functional. Make top level cache key get that returns all of a cache key.
  cacheGet = (vars) => {
    const p = new Promise( (resolve) => {
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
      if ( focus.currentFocus.id === vars.id && focus.currentFocus.centerX === vars.centerX && focus.currentFocus.centerY === vars.centerY ) {
        resolve(vars);  // fulfilled successfully
      }
    });
    return p;
  }


  updateFocus = async (id, focusX, focusY) => {
    console.log('Diagram Update Focus State');
    console.log('Checking cache.....');
    await this.cacheIsSet({id: id, centerX: focusX, centerY: focusY});
    console.log('Cache is set');

    this.setState({ currentID: id });
    this.setState({ currentX: focusX });
    this.setState({ currentY: focusY });
    this.setFocus();
  }

  updateZoom = (event) => {
    this.setState({ currentZoom: event.a });
    this.setState({ isZoomed: true });
  }

  openDialog = (nodeID) => {
    console.log('Hi are we friends? I hope so.');
    this.setState({ currentDialog: nodeID });

  }

  closeDialog = () => {
    this.setState({ currentDialog: '' });
  }

  setNodeState = (nodes) => {
    // Do something to update a node state.
    this.setState({nodes: nodes})
  }

  render() {
    const {
      width,
      height,
      startX,
      startY,
      viewer
    } = this.props;

    const {
      currentZoom,
      currentDialog
    } = this.state;

    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 2;
    const radius = (baseradius*75)/100;

    // const circleData = this.calculateNodeCenters(diagramData);
    return (
      //<DiagramCache value={this.state}>
        <div className="diagramviewer">
          <div className="viewer">
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
              onClick={this.handleClick}
              onZoom={this.updateZoom}
              onDoubleClick={this.handleDoubleClick}
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
                      name={ diagram.name }
                      parent={ diagram.parentID }
                      fields={ diagram.fields }
                      updateFocus={ this.updateFocus }
                      resetFocus={ this.resetFocus }
                      openDialog={ this.openDialog }
                      closeDialog={ this.closeDialog }
                      setNodeState={ this.setNodeState }
                      nodes={this.state.nodes}
                    />
                  )) }
                </g>
              </svg>
            </ReactSVGPanZoom>
          </div>
          <div className="diagramDialogs">
            <RadialDialog
              name={ 'Dialog Box' }
              nodeID={ currentDialog }
            />
          </div>
        </div>
      //</DiagramCache>
    );
  }
}
export default withApollo(CircleDiagram);
