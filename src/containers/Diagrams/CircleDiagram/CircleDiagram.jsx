import React, { Component } from 'react';
import { withApollo } from "react-apollo";
import { DiagramData, FieldData, OwnerData, DataUtils } from '../../../config';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

//import { Diagram, DiagramCache } from 'containers/Diagrams/Diagram';
import { NetWorthNode, RadialNode, RadialDialog } from '../../../components/Diagrams';
import { getFields, getCurrentFocus, getNodes, defaults } from '../../../graphql';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child nodes.
 */
class CircleDiagram extends Component {
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

    this.timeouts = [];

    // Component Specific Methods
    this.setFocus = this.setFocus.bind(this);
    this.getFocus = this.getFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.primeCache = this.primeCache.bind(this);
    this.setOwnerCache = this.setOwnerCache.bind(this);
    this.setFieldCache = this.setFieldCache.bind(this);
    this.setDataCache = this.setDataCache.bind(this);
    this.setNodeState = this.setNodeState.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
    this.getFields = this.getFields.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.Viewer = React.createRef();
    this.backgroundSheet = React.createRef();
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

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  handleClick = (event) => {
    const target = event.originalEvent.target;
    if (!target) return;
    if (target !== this.backgroundSheet) return;
    this.resetFocus();
    this.setTemporaryAnimatable();
  }

  handleDoubleClick = (event) => {
    //console.log(event.x, event.y, event.originalEvent);
  }

  resetState() {
    // console.log('Reset state')
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
    // console.log('Reset focus');
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
    // console.log(`Moving Focus to ${x}, ${y}:`, focus);

    /** Our desired zoom for the current node that was clicked */
    let zoom = this.props.zoom * current.zoom.scale;

    let xs = [], ys = [];
    xs.push(current.centerX - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth))
    xs.push(current.centerX + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth))
    ys.push(current.centerY - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth))
    ys.push(current.centerY + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth))

    const children = DataUtils.getChildrenOf(current.id);
    const hasChildren = children && children.length > 0
    if (hasChildren) {
      children.forEach(child => {
        xs.push(child.centerX - this.getStandardRadius(child.depth) - this.getStandardStrokeWidth(child.depth))
        xs.push(child.centerX + this.getStandardRadius(child.depth) + this.getStandardStrokeWidth(child.depth))
        ys.push(child.centerY - this.getStandardRadius(child.depth) - this.getStandardStrokeWidth(child.depth))
        ys.push(child.centerY + this.getStandardRadius(child.depth) + this.getStandardStrokeWidth(child.depth))
      })
    }
    const minX = Math.min.apply(null, xs)
    const maxX = Math.max.apply(null, xs)
    const minY = Math.min.apply(null, ys)
    const maxY = Math.max.apply(null, ys)
    let k = (window.innerHeight / this.props.zoom) / (maxY - minY)
    zoom = zoom * k * 0.8
    /* Next two lines are needed to calculate the point that is the center of a client's screen
     * As long as ReactSVGPanZoom lib calculates the center relatively to its own sizes we always got wrong numbers so
     * here we including into the calculations our sizes of the screen.
    */
    // const screenCenterX = (this.Viewer.props.width - window.innerWidth) * (1 - current.zoom.x) / zoom;
    // const screenCenterY = (this.Viewer.props.height - window.innerHeight) * (1 - current.zoom.y) / zoom;
    const screenCenterX = (minX + (maxX - minX) * 0.5);
    const screenCenterY = (minY + (maxY - minY) * 0.5) + 0.5;
    // const screenCenterY = minY + (maxY - minY) * 0.5;

    // this.Viewer.setPointOnViewerCenter(screenCenterX + x, screenCenterY + y, zoom);
    this.Viewer.setPointOnViewerCenter(screenCenterX, screenCenterY, hasChildren ? zoom : this.Viewer.state.value.a);

    this.setTemporaryAnimatable();
  }

  /** Sets the zoom animatable just only for current case, then make it usual again */
  setTemporaryAnimatable(animationDuration) {
    if (animationDuration === undefined) animationDuration = 300
    // Add and remove the class "animated" in order to animate the movement only for Click Node Zooming (and not for the usual movement by the mouse)
    // We remove the class upon the anim is ended, otherwise the anim won't start at all
    if (!this.Viewer.mainG.classList.contains('animated')) {
      this.Viewer.mainG.classList.add('animated');
      this.timeouts.push(setTimeout(() => this.Viewer.mainG.classList.remove('animated'), animationDuration));
    }
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
    // console.log('Getting cached Nodes', variables);
    return this.props.client.readQuery({ query: getNodes, variables: variables });
  }

  updateFocus = (id, focusX, focusY) => {
    const current = this.getFocus();

    this.setState({
      currentID: current.currentFocus.id,
      currentX: current.currentFocus.centerX,
      currentY: current.currentFocus.centerY
    });
    this.setFocus();
  }

  updateZoom = (event) => {
    this.setState({ currentZoom: event.a });
    this.setState({ isZoomed: true });
  }

  openDialog = (nodeID, parent = '') => {
    if (parent === 'offense_allocation') return;
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

  /**
   * Set our data cache before we deal with User interactions.
   * Make you you consider the order which you data is primed. In this case, owners are part of fields which are part of the diagram.
   */
  primeCache = () => {
    // console.log('Priming');
    // @TODO: REMOTE GRAPHQL CALLS GO HERE. FOR NOW WE PULL IN CONFIG BASED DATA.
    this.setOwnerCache(OwnerData);
    this.setFieldCache(FieldData);
    this.setDataCache(DiagramData);
  }

  setOwnerCache = (data=[]) => {

  }

  setFieldCache = (data=[]) => {
    // console.log('Updating Field cache');
    let previous = this.getFields({});
    if (!data.length) return false;

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
      if (node.zoom) node.zoom.__typename = 'ZoomScale';
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

  getStandardRadius(depth = 0) {
    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 10;
    return (baseradius * 75) / 100 * (Math.pow(0.6, depth));
  }

  getStandardStrokeWidth(depth = 0) {
    return this.getStandardRadius(depth) * 0.5;
  }

  render() {
    return (
      <div className="diagramviewer">
        <div className="viewer">
          <ReactSVGPanZoom
            width={ this.props.width }
            height={ this.props.height }
            background='transparent'
            tool='auto'
            toolbarPosition='none'
            miniaturePosition='none'
            disableDoubleClickZoomWithToolAuto={ true }
            scaleFactor={ 2.5 }
            scaleFactorOnWheel={ 1.06 }
            scaleFactorMin={ 1 }
            ref={Viewer => {
              this.Viewer = Viewer;
              if (!this.Viewer) return;
              this.Viewer.mainG = this.Viewer.ViewerDOM.getElementsByTagName('g')[0];
              this.backgroundSheet = this.Viewer.mainG.getElementsByTagName('rect')[0];
            }}
            onClick={ this.handleClick }
            onZoom={ this.updateZoom }
            onDoubleClick={ this.handleDoubleClick }
          >
            <svg
              id="circlediagram" width={this.props.width} height={this.props.height}
            >
              <g id="diagramGroup">
                { DiagramData.map(diagram => {
                  let NodeClass = RadialNode;
                  if (diagram.id === 'net_worth') NodeClass = NetWorthNode;
                  return <NodeClass
                    key={ diagram.id }
                    nodeData={ typeof(diagram.children) === undefined ? [] : diagram.children }
                    nodeID={ diagram.id }
                    scaleFactor={ 1 }
                    {...diagram}
                    radius={ this.getStandardRadius() }
                    updateFocus={ this.updateFocus }
                    resetFocus={ this.resetFocus }
                    openDialog={ this.openDialog }
                    closeDialog={ this.closeDialog }
                    setNodeState={ this.setNodeState }
                    nodes={ this.state.nodes }
                    isShown={ true /* The prop means whether the node is being rendered right now by its parent */ }
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
            nodeID={ this.state.currentDialog }
          />
        </div>
      </div>
    );
  }
}
export default withApollo(CircleDiagram);
