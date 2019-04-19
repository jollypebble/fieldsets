import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { setCurrentFocus } from '../../graphql';
import Shape from './Shape';

/**
 * Nodes are state data components that represent groupings of field data and a users interactions with that data.
 * Each node will check its own node data and will iteratively call itself if there are children.
 */

const offenseAllocation = 'offense_allocation';
const longTermID = 'long_term_money';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display, // display node shapes that can change depending on node data and state.
      isMouseInside: false,
      visible: this.props.visible,
      wasClickedAtLeastOnce: false, // whether the node was clicked at least once (is used for initial animations)
      containFocus: true,
      initialFocus: undefined,
      longTermData: []
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.setRadius = this.setRadius.bind(this);
    this.getLongTermData = this.getLongTermData.bind(this);
    this.updateLongTermData = this.updateLongTermData.bind(this);

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
    this.getLongTermData();
  }

  componentDidUpdate(prevProps) {
    // here we want to hide all nodes down the tree if their parent is hidden
    if (!this.props.isShown && this.state.visible) this.setState({ visible: false });
    if (prevProps.nodeID !== this.props.nodeID) this.getLongTermData();
  }

  getLongTermData() {
    const { nodeData, nodeID } = this.props;
    if (nodeID === longTermID) {
      this.setState({ longTermData: nodeData });
    }
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

  /** Is called when we click on the radial node */
  handleClick() {
    if (this.isHidden()) return;
    if (this.state.visible) {
      if (this.hasParent()) {
        this.props.openDialog(this.props.nodeID, this.props.parent);
      } else {
        this.props.updateFocus(this.props.nodeID, this.props.centerX, this.props.centerY);
      }
    } else {
      this.props.updateFocus(this.props.nodeID, this.props.centerX, this.props.centerY);
      this.setState({ visible: !this.state.visible });
    }
    this.setState({ wasClickedAtLeastOnce: true });
  }

  /** Is called when we doubleclick on the radial node */
  handleDoubleClick = () => {
    // TODO: OPEN DIALOG AND SET FIELDS TO DISPLAY
    // this.props.openDialog(this.props.nodeID);
    if (this.props.parent === offenseAllocation) return;
    if (this.state.visible) {
      this.setState({ visible: !this.state.visible });
    }
  }

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  updateLongTermData() {
    let { longTermData } = this.state;
    const temp = Object.assign([], longTermData);
    const lastElement = longTermData.pop();
    longTermData.unshift(lastElement);
    this.setState({
      longTermData: longTermData.map((item, index) => {
        return { ...item, centerX: temp[index].centerX, centerY: temp[index].centerY, ratio: temp[index].ratio };
      })
    });
  }

  getInsideElements(name, centerX, centerY, focusCircle) {
    let { textX, textY, scaleFactor, textSize, ratio, id } = this.props;
    textSize = (ratio ? ratio * textSize : textSize) * 0.9;
    const fontSize = (textSize ? textSize : 0.5 * scaleFactor) + 'pt';
    return (
      <React.Fragment>
        <text
          ref={this.nodeTextElement}
          x={textX ? textX : centerX}
          y={textY ? textY : centerY}
          textAnchor="middle"
          className={'circletext ' + (!this.hasParent() ? 'shown' : '') + ' ' + (!this.props.isShown ? ' hidden' : 'shown') }
          onClick={focusCircle}
        >
          <tspan x={textX ? textX : centerX} style={{ fontSize }} dy="0em">{name}</tspan>
          <tspan x={textX ? textX : centerX} style={{ fontSize }} dy="1.6em">
            { 'Data: Value' }
          </tspan>
          { id === 'long_term_money' && <tspan y={textY ? textY + 0.2 : centerY + 0.2 } className="refresh-icon">&#xf0e2;</tspan>}
        </text>
      </React.Fragment>
    );
  }

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

  setRadius = (radius) => {
    return this.state.isMouseInside && this.props.parent !== offenseAllocation ? radius * 1.1 : radius;
  }

  render() {
    const id = this.props.nodeID;
    let display = this.state.display;

    let { name, centerX, centerY, nodeData } = this.props;

    let parentNode = '';

    if (id === longTermID) {
      const { longTermData } = this.state;
      nodeData = longTermData.length ? longTermData : nodeData;
    };

    if (typeof(this.props.nodeData) !== undefined && this.props.nodeData.length > 0) {
      parentNode =
      <g id={ this.props.nodeID ? `${this.props.nodeID}-children` : '' }>
        { nodeData.map(data => {

          return (
            <Node
              key={ data.id }
              nodeData={ typeof(data.children) === undefined ? [] : data.children }
              nodeID={ data.id }
              shape={display.shape}
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

              isShown={this.state.visible /* The prop means whether the node is being rendered right now by its parent */}
              wasParentClickedAtLeastOnce={this.state.wasClickedAtLeastOnce /* Whether the parent of the node was clicked at least once (is used for initial animations) */}
            />
          );
        }) }
      </g>;
    }

    /** "Immersion class" defines whether a node is a main (root node) or sub-node (has a parent) */
    const immersionClass = this.hasParent() ? 'child-node' : 'parent-node';

    /** "Shown class" exists only for those nodes that are able to show up and hide (child/sub nodes)  */
    const shownClass = this.hasParent() && this.props.wasParentClickedAtLeastOnce ? (this.props.isShown ? 'shown' : 'hidden') : '';

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
              onDoubleClick={this.handleDoubleClick}
              onClick={focusCircle}
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
                  attributes={{
                    centerX,
                    centerY,
                    ...display.attributes
                  }}
                  scaleFactor={ this.props.scaleFactor * 0.6 }
                />
                {this.getInsideElements(name, centerX, centerY, focusCircle)}
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
  shape: PropTypes.string.isRequired,
  centerX: PropTypes.node.isRequired,
  centerY: PropTypes.node.isRequired,
};

//export default withApollo(RadialNode);
//export default React.forwardRef((props, ref) => <RadialNode updateFocus={ref} {...props}/>);
export default Node;
