import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { SetData, FieldData, AccountData } from 'data/Diagrams/CircleDiagram';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { Button } from 'react-md';
import { toast, ToastContainer } from 'react-toastify';

import { Set, Dialog } from 'components/Sets';
import {
  getFields,
  getFieldList,
  updateField,
  updateAllFields,
  getInitialFieldData,
  getCurrentFocus,
  getSets,
  getSetList,
  defaults,
  getSetFields
} from '../../../graphql';

import 'react-toastify/dist/ReactToastify.min.css';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child sets.
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
      sets: {},
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
    this.updateAccountCache = this.updateAccountCache.bind(this);
    this.updateFieldCache = this.updateFieldCache.bind(this);
    this.updateDataCache = this.updateDataCache.bind(this);
    this.updateSetState = this.updateSetState.bind(this);
    this.getSetsData = this.getSetsData.bind(this);
    this.getSet = this.getSet.bind(this);
    this.getAllSets = this.getAllSets.bind(this);
    this.updateFieldState = this.updateFieldState.bind(this);
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
      const temp = data.allFieldData.edges.map(({ set }) => ({
        ...set,
        id: set.fieldId
      }));

      this.updateFieldCache(temp);

      this.setState({ fieldData: temp }, () => this.updateFieldCache(temp));
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
    const currentSet = this.getSet({ id: current.id });

    /** Our desired zoom for the current set that was clicked */
    let zoom = this.props.zoom * currentSet.display.zoom.scale;

    const xs = []; const
      ys = [];
    xs.push(current.centerX - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth));
    xs.push(current.centerX + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth));
    ys.push(current.centerY - this.getStandardRadius(current.depth) - this.getStandardStrokeWidth(current.depth));
    ys.push(current.centerY + this.getStandardRadius(current.depth) + this.getStandardStrokeWidth(current.depth));


    const childList = this.getSetsData({ id: current.id });
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
    // Add and remove the class "animated" in order to animate the movement only for Click Set Zooming (and not for the usual movement by the mouse)
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

  getAllSets = () => {
    return this.props.client.readQuery({ query: getSets });
  }

  getSet = (variables) => {
    const id = `Set:${variables.id}`;
    const set = this.props.client.readFragment({
      id,
      fragment: getSetList,
      fragmentName: 'set'
    });
    return set;
  }

  getSetsData = (variables) => {
    // console.log('Getting cached Sets', variables);
    const id = `SetList:${variables.id}`;
    const sets = this.props.client.readFragment({
      id,
      fragment: getSetList,
      fragmentName: 'sets'
    });
    return sets;
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

  openDialog = (setID) => {
    this.setState({ currentDialog: setID });
  }

  closeDialog = () => {
    this.setState({ currentDialog: '' });
  }

  updateSetState = (sets) => {
    // console.log('Setting Set state.');
    // Do something to update a set state.
    this.setState({ sets });
  }

  updateFieldState = (fields) => {
    // Do something to update a set state.
    this.setState({ fields });
  }

  /**
   * Set our data cache before we deal with User interactions.
   * Make you you consider the order which you data is primed. In this case, accounts are part of fields which are part of the diagram.
   */
  primeCache = () => {
    // @TODO: REMOTE GRAPHQL CALLS GO HERE. FOR NOW WE PULL IN CONFIG BASED DATA.
    this.updateAccountCache(AccountData);
    this.updateFieldCache(this.state.fieldData);
    this.updateDataCache(SetData);
  }

  updateAccountCache = (data = []) => {

  }

  // Cache field values
  updateFieldCache = (data = []) => {
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


      // Now append this field to the parent set field list
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

    this.updateFieldState(fields);

    return true;
  }

  // Caching sets
  updateDataCache = (data = []) => {
    if (!data.length) return false;
    const allSets = this.getAllSets();
    const sets = (allSets.sets.list) ? allSets.sets.list : [];

    data.map((set) => {
      const setID = set.id;
      set.__typename = 'Set';

      const children = typeof (set.children) === undefined ? [] : set.children;

      if (children.length) {
        this.updateDataCache(children);
      }

      // Set generic cache identifiers here so we can cache the display data.
      if (!set.display) {
        set.display = {};
      }

      set.display.id = setID;
      set.display.__typename = 'DisplayData';
      if (set.display.attributes) {
        set.display.attributes.id = setID;
        set.display.attributes.__typename = 'ShapeData';
      }
      if (set.display.zoom) {
        set.display.zoom.id = setID;
        set.display.zoom.__typename = 'ZoomData';
      }

      sets.push(set);

      // If are a child set, let's write to our parent set list cache.
      if (set.parent && set.parent.length) {
        const id = `SetList:${set.parent}`;
        let setList = this.props.client.readFragment({
          id,
          fragment: getSetList,
          fragmentName: 'sets'
        });
        // Child cache hasn't been written yet, so set it to defaults.
        setList = (setList === null) ? { id: set.id, list: [], __typename: 'SetList' } : setList;

        setList.list.push(set);

        // Now append this field to the parent set field list
        this.props.client.writeFragment({
          fragment: getSetList,
          fragmentName: 'sets',
          id,
          data: setList
        });
      }
      return true;
    });

    this.props.client.writeData({
      data: { sets }
    });

    this.updateSetState(sets);
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
      refetchQueries: res => res.data.updateField.map(id => ({ query: getSetFields, variables: { id } }))
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
                {SetData.map((diagram) => {
                  return (
                    <Set
                      key={ diagram.id }
                      setData={ diagram.children || [] }
                      setID={ diagram.id }
                      scaleFactor={ 1 }
                      { ...diagram }
                      radius={ this.getStandardRadius() }
                      updateFocus={ this.updateFocus }
                      resetFocus={ this.resetFocus }
                      openDialog={ this.openDialog }
                      closeDialog={ this.closeDialog }
                      updateSetState={ this.updateSetState }
                      sets={ this.state.sets }
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
            setID={ this.state.currentDialog }
            onClose={ this.closeDialog }
          />}
        </div>
        <ToastContainer style={ { fontWeight: 'bold', width: '450px' } } />
      </div>
    );
  }
}
export default withApollo(CircleDiagram);
