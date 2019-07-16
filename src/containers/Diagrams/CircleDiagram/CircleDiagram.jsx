import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { DiagramData, FieldData, AccountData } from 'data/Diagrams/CircleDiagram';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { Button } from 'react-md';
import { toast, ToastContainer } from 'react-toastify';

import { Node, Dialog } from 'components/Diagrams';
import {
  getFields,
  getFieldList,
  updateField,
  updateAllFields,
  getInitialFieldData,
  getCurrentFocus,
  getNodes,
  getNodeList,
  defaults,
  getNodeFields
} from '../../../graphql';

import 'react-toastify/dist/ReactToastify.min.css';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child nodes.
 */

const toastOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true
};

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
      fieldData: FieldData
    };

    this.timeouts = [];

    // Component Specific Methods
    this.setFocus = this.setFocus.bind(this);
    this.getFocus = this.getFocus.bind(this);
    this.resetFocus = this.resetFocus.bind(this);
    this.updateFieldCache = this.updateFieldCache.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.primeCache = this.primeCache.bind(this);
    this.setAccountCache = this.setAccountCache.bind(this);
    this.setFieldCache = this.setFieldCache.bind(this);
    this.setDataCache = this.setDataCache.bind(this);
    this.setNodeState = this.setNodeState.bind(this);
    this.getNodesData = this.getNodesData.bind(this);
    this.getNode = this.getNode.bind(this);
    this.getAllNodes = this.getAllNodes.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
    this.getFieldData = this.getFieldData.bind(this);
    this.getAllFields = this.getAllFields.bind(this);
    this.getInitialFieldData = this.getInitialFieldData.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.Viewer = React.createRef();
    this.backgroundSheet = React.createRef();
  }

  componentWillMount() {
    this.primeCache();
  }

  /**
   * Here we add all of our component specific event listeners and interact with our component.
   */
  componentDidMount() {
    this.getInitialFieldData();
    this.resetFocus();
    this.resetState();
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
    // console.log(event.x, event.y, event.originalEvent);
  }

  getInitialFieldData() {
    this.props.client.query({
      query: getInitialFieldData
    }).then(({ data, error }) => {
      if (error) {
        console.log('error : ', error);
        toast.error('Sorry! Unable to store field data.', toastOptions);
      }
      const temp = data.allFieldData.edges.map(({ node }) => ({
        ...node,
        id: node.fieldId
      }));

      this.updateFieldCache(temp);

      this.setState({ fieldData: temp }, () => this.setFieldCache(temp));
    });
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
    };
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
    const currentNode = this.getNode({ id: current.id });

    /** Our desired zoom for the current node that was clicked */
    let zoom = this.props.zoom * currentNode.display.zoom.scale;

    const xs = []; const
      ys = [];
    xs.push(current.centerX - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth));
    xs.push(current.centerX + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth));
    ys.push(current.centerY - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth));
    ys.push(current.centerY + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth));


    const childList = this.getNodesData({ id: current.id });
    const children = (childList && childList.list) ? childList.list : false;

    const hasChildren = children && children.length > 0;
    if (hasChildren) {
      children.forEach((child) => {
        xs.push(child.centerX - this.getStandardRadius(child.depth) - this.getStandardStrokeWidth(child.depth));
        xs.push(child.centerX + this.getStandardRadius(child.depth) + this.getStandardStrokeWidth(child.depth));
        ys.push(child.centerY - this.getStandardRadius(child.depth) - this.getStandardStrokeWidth(child.depth));
        ys.push(child.centerY + this.getStandardRadius(child.depth) + this.getStandardStrokeWidth(child.depth));
      });
    }
    const minX = Math.min.apply(null, xs);
    const maxX = Math.max.apply(null, xs);
    const minY = Math.min.apply(null, ys);
    const maxY = Math.max.apply(null, ys);
    const k = (window.innerHeight / this.props.zoom) / (maxY - minY);
    zoom = zoom * k * 0.8;
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
    if (animationDuration === undefined) animationDuration = 300;
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

  getAllFields = () => {
    return this.props.client.readQuery({ query: getFields });
  }

  getFieldData = (variables) => {
    const id = `FieldList:${variables.id}`;
    const fields = this.props.client.readFragment({
      id,
      fragment: getFieldList,
      fragmentName: 'fields'
    });
    return fields;
  }

  getAllNodes = () => {
    return this.props.client.readQuery({ query: getNodes });
  }

  getNode = (variables) => {
    const id = `Node:${variables.id}`;
    const node = this.props.client.readFragment({
      id,
      fragment: getNodeList,
      fragmentName: 'node'
    });
    return node;
  }

  getNodesData = (variables) => {
    // console.log('Getting cached Nodes', variables);
    const id = `NodeList:${variables.id}`;
    const nodes = this.props.client.readFragment({
      id,
      fragment: getNodeList,
      fragmentName: 'nodes'
    });
    return nodes;
  }

  updateFocus = (id, focusX, focusY) => {
    const current = this.getFocus();
    // console.log(current);

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

  openDialog = (nodeID) => {
    this.setState({ currentDialog: nodeID });
  }

  closeDialog = () => {
    this.setState({ currentDialog: '' });
  }

  setNodeState = (nodes) => {
    // console.log('Setting Node state.');
    // Do something to update a node state.
    this.setState({ nodes });
  }

  setFieldState = (fields) => {
    // Do something to update a node state.
    this.setState({ fields });
  }

  /**
   * Set our data cache before we deal with User interactions.
   * Make you you consider the order which you data is primed. In this case, accounts are part of fields which are part of the diagram.
   */
  primeCache = () => {
    // @TODO: REMOTE GRAPHQL CALLS GO HERE. FOR NOW WE PULL IN CONFIG BASED DATA.
    this.setAccountCache(AccountData);
    this.setFieldCache(this.state.fieldData);
    this.setDataCache(DiagramData);
  }

  setAccountCache = (data = []) => {

  }

  // Cache field values
  setFieldCache = (data = []) => {
    if (!data.length) return false;
    const allFields = this.getAllFields();
    allFields.fields.list = (allFields.fields.list) ? allFields.fields.list : [];

    // Get your fields here. This is defined as a static json, but could be modified here to get remote field type definitions.
    data.map((currentField) => {
      currentField.__typename = 'Field';

      const id = `FieldList:${currentField.parent}`;

      let fieldList = this.props.client.readFragment({
        id,
        fragment: getFieldList,
        fragmentName: 'fields'
      });

      // Cache hasn't been written yet, so set it using default.
      fieldList = (fieldList === null) ? { id: currentField.parent, list: [], __typename: 'FieldList' } : fieldList;
      fieldList.list = fieldList.list.filter(item => item.id !== currentField.id);
      fieldList.list.push(currentField);

      // Append the field to the complete set.
      // allFields.fields.list = allFields.fields.list.filter(item => item.id === currentField.id);
      allFields.fields.list.push(currentField);


      // Now append this field to the parent node field list
      this.props.client.writeFragment({
        fragment: getFieldList,
        fragmentName: 'fields',
        id,
        data: fieldList
      });

      return true;
    });

    const fields = allFields.fields.list;
    this.props.client.writeData({
      data: { fields }
    });

    this.setFieldState(fields);

    return true;
  }

  // Caching nodes
  setDataCache = (data = []) => {
    if (!data.length) return false;
    const allNodes = this.getAllNodes();
    const nodes = (allNodes.nodes.list) ? allNodes.nodes.list : [];

    data.map((node) => {
      const nodeID = node.id;
      node.__typename = 'Node';

      const children = typeof (node.children) === undefined ? [] : node.children;

      if (children.length) {
        this.setDataCache(children);
      }

      // Set generic cache identifiers here so we can cache the display data.
      if (!node.display) {
        node.display = {};
      }

      node.display.id = nodeID;
      node.display.__typename = 'DisplayData';
      if (node.display.attributes) {
        node.display.attributes.id = nodeID;
        node.display.attributes.__typename = 'ShapeData';
      }
      if (node.display.zoom) {
        node.display.zoom.id = nodeID;
        node.display.zoom.__typename = 'ZoomData';
      }

      nodes.push(node);

      // If are a child node, let's write to our parent node list cache.
      if (node.parent && node.parent.length) {
        const id = `NodeList:${node.parent}`;
        let nodeList = this.props.client.readFragment({
          id,
          fragment: getNodeList,
          fragmentName: 'nodes'
        });
        // Child cache hasn't been written yet, so set it to defaults.
        nodeList = (nodeList === null) ? { id: node.id, list: [], __typename: 'NodeList' } : nodeList;

        nodeList.list.push(node);

        // Now append this field to the parent node field list
        this.props.client.writeFragment({
          fragment: getNodeList,
          fragmentName: 'nodes',
          id,
          data: nodeList
        });
      }
      return true;
    });

    this.props.client.writeData({
      data: { nodes }
    });

    this.setNodeState(nodes);
    return true;
  }

  getStandardRadius(depth = 0) {
    // Scale our SVG based on our desired width height based on a 100 x 75 canvas.
    const baseradius = 10;
    return (baseradius * 75) / 100 * (0.6 ** depth);
  }

  getStandardStrokeWidth(depth = 0) {
    return this.getStandardRadius(depth) * 0.5;
  }

  updateFieldCache(data = []) {
    if (!data.length) return;

    this.props.client.mutate({
      mutation: updateField,
      variables: { data },
      refetchQueries: res => res.data.updateField.map(id => ({ query: getNodeFields, variables: { id } }))
    });
  }

  storeFieldData = () => {
    const fields = [];

    this.getAllFields().fields.forEach((variable) => {
      if (variable.id === 'default') return;
      const id = `Field:${variable.id}`;

      const item = this.props.client.readFragment({
        id,
        fragment: getFieldList,
        fragmentName: 'field'
      });

      fields.push(item);
    });

    this.props.client.mutate({
      mutation: updateAllFields,
      variables: { data: JSON.stringify(fields) }
    }).then(({ error }) => {
      if (error) {
        console.log('error : ', error);
        toast.error('Sorry! Unable to store field data.', toastOptions);
        return;
      }
      toast.info('Successfully updated Field Data on database!', toastOptions);
    });
  }

  render() {
    return (
      <div className="diagramviewer">
        <div className="viewer">
          <ReactSVGPanZoom
            width={ this.props.width }
            height={ this.props.height }
            background="transparent"
            tool="auto"
            toolbarPosition="none"
            miniaturePosition="none"
            disableDoubleClickZoomWithToolAuto
            scaleFactor={ 2.5 }
            scaleFactorOnWheel={ 1.06 }
            scaleFactorMin={ 1 }
            ref={ (Viewer) => {
              this.Viewer = Viewer;
              if (!this.Viewer) return;
              this.Viewer.mainG = this.Viewer.ViewerDOM.getElementsByTagName('g')[0];
              this.backgroundSheet = this.Viewer.mainG.getElementsByTagName('rect')[0];
            } }
            onClick={ this.handleClick }
            onZoom={ this.updateZoom }
            onDoubleClick={ this.handleDoubleClick }
          >
            <svg
              id="circlediagram"
              width={ this.props.width }
              height={ this.props.height }
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
                {DiagramData.map((diagram) => {
                  return (
                    <Node
                      key={ diagram.id }
                      nodeData={ diagram.children || [] }
                      nodeID={ diagram.id }
                      scaleFactor={ 1 }
                      { ...diagram }
                      radius={ this.getStandardRadius() }
                      updateFocus={ this.updateFocus }
                      resetFocus={ this.resetFocus }
                      openDialog={ this.openDialog }
                      closeDialog={ this.closeDialog }
                      setNodeState={ this.setNodeState }
                      nodes={ this.state.nodes }
                      visible
                    />
                  );
                })
                }
              </g>
            </svg>
          </ReactSVGPanZoom>
          <Button raised secondary className="storeFieldData" onClick={ this.storeFieldData }>Store Field Data</Button>
        </div>
        <div className="diagramSheet" />
        <div className="diagramDialogs">
          {this.state.currentDialog && <Dialog
            nodeID={ this.state.currentDialog }
            onClose={ this.closeDialog }
          />}
        </div>
        <ToastContainer style={ { fontWeight: 'bold', width: '450px' } } />
      </div>
    );
  }
}
export default withApollo(CircleDiagram);
