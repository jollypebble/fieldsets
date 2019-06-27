import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import _ from 'lodash';
import { setCurrentFocus } from '../../graphql';
import Shape from './Shape';
import Label from './Label';

/**
 * Nodes are state data components that represent groupings of field data and a users interactions with that data.
 * Each node will check its own node data and will iteratively call itself if there are children.
 */

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
      visible: this.props.visible,
      containFocus: true,
      initialFocus: undefined
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.nodeElement = React.createRef();
    this.nodeGroupElement = React.createRef();
    this.nodeTextElement = React.createRef();
  }

  componentDidMount() {
    this.updateNodeData();
    if (this.nodeElement && this.nodeElement.current) {
      this.nodeElement.current.removeEventListener('transitionend', this.handleTransitionEnd)
      this.nodeElement.current.addEventListener('transitionend', this.handleTransitionEnd)
    }
  }

  componentDidUpdate(prevProps) {
    // here we want to hide all nodes down the tree if their parent is hidden
    if (!this.props.visible && this.state.visible) this.setState({ visible: false });
  }

  isHidden() {
    return this.nodeGroupElement && this.nodeGroupElement.current && this.nodeGroupElement.current.classList.contains('hidden');
  }

  hasParent = () => {
    return this.props && this.props.parent !== '';
  }

  // Called when the css transition ends
  handleTransitionEnd(e) {
    // checks whether the transition was on a position property
    if (this.nodeGroupElement && this.nodeGroupElement.current && e && (e.propertyName === 'cx' || e.propertyName === 'cy')) {
      // Show/hide circles after the circle appearing animation
      if (this.nodeGroupElement.current.classList.contains('hidden')) {
        this.nodeGroupElement.current.classList.add('afterHidden');
      } else if (this.nodeGroupElement.current.classList.contains('afterHidden')) {
        this.nodeGroupElement.current.remove('afterHidden');
      }

      // Show/hide text labels after the circle appearing animation
      if (this.nodeTextElement && this.nodeGroupElement.current.classList.contains('shown')) {
        if (!this.nodeTextElement.current.classList.contains('shown')) this.nodeTextElement.current.classList.add('shown');
      } else {
        if (this.nodeTextElement.current.classList.contains('shown')) this.nodeTextElement.current.classList.remove('shown');
      }
    }
  }

  /** Is called when the cursor acrosses borders of the radial node getting inside of it */
  handleMouseEnter() {
    this.setState({ isMouseInside: true });
  }

  /** Is called when the cursor acrosses borders of the radial node getting out of it */
  handleMouseLeave() {
    this.setState({ isMouseInside: false });
  }

  handleClick(e) {
    if (!this._delayedClick) {
      this._delayedClick = _.debounce(this.handleSingleClick, 200);
    }
    if (this.clickedOnce) {
      this._delayedClick.cancel();
      this.clickedOnce = false;
      this.handleDoubleClick();
    } else {
      this._delayedClick(e);
      this.clickedOnce = true;
    }
  }

  handleSingleClick() {
    const { nodeID, centerX, centerY } = this.props;

    this.clickedOnce = undefined;
    this.props.updateFocus(nodeID, centerX, centerY);
  }

  handleDoubleClick = () => {
    if (!this.props.parent) return;
    this.props.openDialog(this.props.nodeID);
  }

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  updateNodeData() {
    // TODO GET BOUNDING BOX HERE:

    // Emulate Circle Appollo Data Type in `graphql/typeDefs.js`
    const nodedata = {
      id: this.props.nodeID,
      name: this.props.name,
      fields: this.props.fields,
      parent: this.props.parent,
      centerX: this.props.centerX,
      centerY: this.props.centerY,
      shape: this.props.shape
    };

    let updatedNodeList = this.props.nodes;
    updatedNodeList[this.props.nodeID] = nodedata;

    this.props.setNodeState(updatedNodeList); // Sets the top level Diagram node array.
    return this.state.nodes;
  }

  render() {
    const id = this.props.nodeID;

    let { name, centerX, centerY, nodeData, parentCenterX, parentCenterY, display } = this.props;

    let parentNode = '';

    if (typeof(this.props.nodeData) !== undefined && this.props.nodeData.length > 0) {
      parentNode =
      <g id={ this.props.nodeID ? `${this.props.nodeID}-children` : '' }>
        { nodeData.map(data => {

          return (
            <Node
              key={ data.id }
              nodeData={ typeof(data.children) === undefined ? [] : data.children }
              nodeID={ data.id }
              {...data}

              parentInstance={ this }
              parentCenterX={ centerX }
              parentCenterY={ centerY }

              updateFocus={ this.props.updateFocus }
              resetFocus={ this.props.resetFocus }
              openDialog={ this.props.openDialog }
              setNodeState={ this.props.setNodeState }
              nodes={ this.props.nodes }
              radius={ this.props.radius }
              scaleFactor={ this.props.scaleFactor * 0.6 }
              visible={true}
            />
          );
        }) }
      </g>;
    }

    /** "Immersion class" defines whether a node is a main (root node) or sub-node (has a parent) */
    const immersionClass = this.hasParent() ? 'child-node' : 'parent-node';

    /** "Shown class" exists only for those nodes that are able to show up and hide (child/sub nodes)  */
    const shownClass = this.hasParent() ? (this.props.visible ? 'shown' : 'hidden') : '';

    /** We want to hide children at the start of the app */
    const afterHiddenClass = this.hasParent() && shownClass === '' ? 'afterHidden' : '';

    // Child Node
    return (
      <Mutation mutation={setCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
        {focusCircle => {
          return (
            <g
              id={ this.props.nodeID ? `${this.props.nodeID}-group` : '' }
              className='radial-group'
              ref={this.nodeGroupElement}
            >
              <g
                id={`${this.props.nodeID}-circle`}
                className={'circle-group ' + immersionClass + ' ' + shownClass + ' ' + afterHiddenClass}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <Shape
                  id={id}
                  shape={display.shape}
                  active={this.state.isMouseInside}
                  visibility={shownClass}
                  onClick={focusCircle}
                  onDoubleClick={this.handleDoubleClick}
                  attributes={{
                    centerX,
                    centerY,
                    parentCenterX,
                    parentCenterY,
                    ...display.attributes
                  }}
                  scaleFactor={ this.props.scaleFactor * 0.6 }
                />
                <React.Fragment>
                  <Label
                    {...this.props}
                    name={name}
                    centerX={centerX}
                    centerY={centerY}
                    onClick={focusCircle}
                    hasParent={ this.hasParent() }
                    nodeTextElement={ this.nodeTextElement }
                  />
                </React.Fragment>

              </g>
              {parentNode}
            </g>
          );
        }}
      </Mutation>
    );
    }
  }

Node.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  centerX: PropTypes.node.isRequired,
  centerY: PropTypes.node.isRequired,
};

//export default withApollo(RadialNode);
//export default React.forwardRef((props, ref) => <RadialNode updateFocus={ref} {...props}/>);
export default Node;
