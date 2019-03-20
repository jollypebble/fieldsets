import React, { Component } from 'react';
import { withApollo } from "react-apollo";
import { DiagramData, FieldData } from '../../config';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

import { NetWorthNode, RadialNode, RadialDialog } from '../../components/Diagrams';
import { getFields, getCurrentFocus, getNodes, defaults } from '../../graphql';

/**
 * This top level object for a diagram. All data priming and loading is handled in with this and other classes can extend it.
 */
class Diagram extends Component {
  constructor(props) {
    super(props);

    // Component State
    this.state = {
      currentID: 'default',
      currentX: this.props.startX,
      currentY: this.props.startY,
      currentZoom: this.props.zoom,
      nodes: {},
      sheets: {},
      fields: {},
      currentDialog: '',
      isZoomed: false,
      isDblClick: false,
      mouseInCircle: false
    };

    // Component Specific Methods
    this.setFocus = this.setFocus.bind(this);
    this.getFocus = this.getFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.primeCache = this.primeCache.bind(this);
    this.setFieldCache = this.setFieldCache.bind(this);
    this.setDataCache = this.setDataCache.bind(this);
    this.setNodeState = this.setNodeState.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
    this.getFields = this.getFields.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.Viewer = React.createRef();
  }

  /**
   * Component will Mount is used as a one time initialization.
   * We use this to prime our cache for this component.
   */
  componentWillMount() {
    // This primes our cache.
    this.primeCache();
    // console.log('cache primed');
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
    // console.log('Defaults:', defaults);
    const currentFocus = defaults.currentFocus;
    this.props.client.writeData({ data: { currentFocus } });

    // Reset our state
    const state = {
      currentID: 'default',
      currentX: startX,
      currentY: startY,
      currentZoom: zoom,
      isZoomed: false
    }
    this.setState(state);
  }

  resetFocus() {
    // console.log( 'Diagram Reset' );
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
    const focus = this.getFocus();
    const current = focus.currentFocus;
    // console.log(`Moving Focus to ${current.centerX}, ${current.centerY}`);

    // Get the bounding box of the SVG group and zoom in on it.
    /**
     * @TODO: $DREAMING_BIG
     * Passs the groups up from the SVG properly.
     * We shouldn't need document.querySelector but not sure the besf way to do this here, as this is hella slow.
     * We should probably write our own bounding box function based off the current radius of the RadialNode and parent size when we prime the cache.
     */
    const group = document.querySelector(`#${current.id}-group`);
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
    this.Viewer.setPointOnViewerCenter(current.centerX, current.centerY, newZoom);
  }

  getFocus = () => {
    return this.props.client.readQuery({ query: getCurrentFocus });
  }

  getFields = (variables) => {
    // console.log('Getting cached fields');
    // console.log(variables);
    //if (variables.parent) {
    //  console.log('Getting partial set of fields');
    //  return this.props.client.readQuery({ query: getNodeFields, variables: variables });
    //} else {
    //  console.log('Getting all fields');
      return this.props.client.readQuery({ query: getFields });
    //}
  }

  getNodes = (variables) => {
    // console.log('Getting cached Nodes');
    return this.props.client.readQuery({ query: getNodes, variables: variables });
  }

  updateFocus = (id,focusX, focusY) => {
    console.log('Updating Focus.....');
    // const current = this.state.nodes[id];
    const current = this.getFocus();
    console.log(current);

    this.setState({ currentID: current.id });
    this.setState({ currentX: current.centerX });
    this.setState({ currentY: current.centerY });
    this.setFocus();
  }

  updateZoom = (event) => {
    this.setState({ currentZoom: event.a });
    this.setState({ isZoomed: true });
  }

  openDialog = (nodeID) => {
    this.setState({ currentDialog: nodeID });
  }

  closeDialog = () => {
    this.setState({ currentDialog: '' });
  }

  setNodeState = (nodes) => {
    // console.log('Setting Node state.');
    // Do something to update a node state.
    this.setState({nodes: nodes});
  }

  setFieldState = (fields) => {
    // console.log('Setting Field state.');
    // Do something to update a node state.
    this.setState({fields: fields});
  }

  primeCache = () => {
    // console.log('Priming');
    // @TODO: REMOTE GRAPHQL CALLS GO HERE. FOR NOW WE PULL IN CONFIG BASED DATA.
    this.setFieldCache(FieldData);
    this.setDataCache(DiagramData);
  }

  setFieldCache = (data=[]) => {
    // console.log('Updating Field cache');
    let previous = this.getFields({});
    if (! data.length) {
      return false;
    }

    // Get your fields here. This is defined as a static json, but could be modified here to get remote field type definitions.
    data.map(currentField => {
      // console.log('Current field:', currentField);
      currentField.__typename = 'Field';
      previous.fields.push(currentField);
      return true;
    });
    const fields = previous.fields;
    this.props.client.writeData({
      data: {fields}
    });

    // console.log('Field cache updated');
    this.setFieldState(fields);

    return true;
  }

  setDataCache = (data=[]) => {
    // console.log('Caching nodes: ');

    let previous = this.getNodes({});
    let nodes = previous.nodes;

    if (! data.length) {
      return false;
    }

    data.map(node => {
      // console.log('Node:', node);
      const children = typeof(node.children) === undefined ? [] : node.children;
      if (children.length) {
        // console.log('Caching child nodes....');
        this.setDataCache(children);
      }

      const previous = this.getFields({parent: node.id});
      // console.log('Previous fields:', previous.fields);
      const fields = previous.fields.map(field => {
        field.__typename = 'Field';
        return field;
      });

      node.__typename = 'Circle';
      nodes.push(node);
      this.props.client.writeData({
        data: {nodes, fields}
      });
      return true;
    });
    // console.log('Cache Updated');
    this.setNodeState(nodes);

    return true;
  }

  render() {
    const {
      width,
      height
    } = this.props;

    const {
      currentDialog,
    } = this.state;

    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 2.3;
    const radius = (baseradius*75)/100;

    return (
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
                  { DiagramData.map(diagram => {
                    let NodeClass = RadialNode
                    if (diagram.id === 'net_worth') NodeClass = NetWorthNode
                    return <NodeClass
                      key={ diagram.id }
                      nodeData={ typeof(diagram.children) === undefined ? [] : diagram.children }
                      nodeID={ diagram.id }
                      scaleFactor={ 1 }
                      centerX={ diagram.centerX }
                      centerY={ diagram.centerY }
                      radius={ radius }
                      name={ diagram.name }
                      parent={ diagram.parent }
                      color={ diagram.color }
                      fields={ diagram.fields }
                      updateFocus={ this.updateFocus }
                      resetFocus={ this.resetFocus }
                      openDialog={ this.openDialog }
                      closeDialog={ this.closeDialog }
                      setNodeState={ this.setNodeState }
                      nodes={this.state.nodes}
                      isShown={true /* The prop means whether the node is being rendered right now by its parent */}
                    />
                  }) }
                </g>
              </svg>
            </ReactSVGPanZoom>
          </div>
          <div className="diagramSheet">
          </div>
          <div className="diagramDialogs">
            <RadialDialog
              name={ 'Dialog Box' }
              nodeID={ currentDialog }
            />
          </div>
        </div>
    );
  }
}
export default withApollo(Diagram);
