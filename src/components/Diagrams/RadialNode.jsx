import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { setCurrentFocus } from '../../graphql';

/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */

const ellipseGroup = ['ellipse'];
const rectGroup = ['rectangle', 'labelGroup', 'radialGroup'];
const circleGroup = ['circle'];
const noValueList = ['monthly_contribution', 'lump_sums', 'short_term_money', 'mid_term_money', 'long_term_money'];

class RadialNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
      visible: this.props.visible,
      isRevealed: false, // the prop means whether the node is rendering its chilren nodes right now. All sub-nodes are hidden from the very beginning
      wasClickedAtLeastOnce: false, // whether the node was clicked at least once (is used for initial animations)
      containFocus: true,
      initialFocus: undefined
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.getExtendedValue = this.getExtendedValue.bind(this);

    this.elCircleNode = React.createRef();
    this.elCircleGroup = React.createRef();
    this.elCircleText = React.createRef();
  }

  componentDidMount() {
    this.updateNodeData();
    if (this.elCircleNode && this.elCircleNode.current) {
    this.elCircleNode.current.removeEventListener('transitionend', this.handleTransitionEnd)
    this.elCircleNode.current.addEventListener('transitionend', this.handleTransitionEnd)
    }
  }

  componentDidUpdate() {
    // here we want to hide all nodes down the tree if their parent is hidden
    if (!this.props.isShown && this.state.isRevealed) this.setState({ isRevealed: false })
  }

  isHidden() {
  return this.elCircleGroup && this.elCircleGroup.current && this.elCircleGroup.current.classList.contains('hidden')
  }

  hasParent() {
    return this.props && this.props.parent !== '';
  }

  /** Is called when the css transition ends */
  handleTransitionEnd(e) {
  // checks whether the transition was on a position property
  if (this.elCircleGroup && this.elCircleGroup.current && e && (e.propertyName === 'cx' || e.propertyName === 'cy')) {
    // Show/hide circles after the circle appearing animation
    if (this.elCircleGroup.current.classList.contains('hidden')) {
      this.elCircleGroup.current.classList.add('afterHidden')
    } else if (this.elCircleGroup.current.classList.contains('afterHidden')) {
      this.elCircleGroup.current.remove('afterHidden')
    }

    // Show/hide text labels after the circle appearing animation
    if (this.elCircleText && this.elCircleGroup.current.classList.contains('shown')) {
      if (!this.elCircleText.current.classList.contains('shown')) this.elCircleText.current.classList.add('shown')
    } else {
      if (this.elCircleText.current.classList.contains('shown')) this.elCircleText.current.classList.remove('shown')
    }
  }
  }

  /** Is called when the cursor acrosses borders of the radial node getting inside of it */
  handleMouseEnter() {
    this.setState({ isMouseInside: true});
  }

  /** Is called when the cursor acrosses borders of the radial node getting out of it */
  handleMouseLeave() {
    this.setState({ isMouseInside: false});
  }

  /** Is called when we click on the radial node */
  handleClick() {
    if (this.isHidden()) return
    if (this.state.isRevealed) {
    if (this.hasParent()) this.props.openDialog(this.props.nodeID, this.props.parent);
    else this.props.updateFocus(this.props.nodeID, this.props.centerX, this.props.centerY);
    } else {
    this.props.updateFocus(this.props.nodeID, this.props.centerX, this.props.centerY);
    this.setState({ isRevealed: !this.state.isRevealed });
  }

    this.setState({ wasClickedAtLeastOnce: true });
  }

  /** Is called when we doubleclick on the radial node */
  handleDoubleClick = () => {
    // TODO: OPEN DIALOG AND SET FIELDS TO DISPLAY
    // this.props.openDialog(this.props.nodeID);
    if (this.props.parent === 'offense_allocation') return;
    if (this.state.isRevealed) {
    this.setState({ isRevealed: !this.state.isRevealed })
    }
  }

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  /** Extra properties that will be passed into Circle instance. It's for beign overrided by sub-classes. */
  getAdditionalCircleProps() { return null };
   
  getInsideElements(name, centerX, centerY, focusCircle) {
    let { textX, textY, color, scaleFactor, textSize, ratio, id } = this.props;
    let textColor = color && color.text ? color.text : '#515359';
    textSize = ratio ? ratio * textSize * 0.9 : textSize;
    const fontSize = (textSize ? textSize : 0.5 * scaleFactor) + 'pt';
    return (
      <React.Fragment>
        <text
          ref={this.elCircleText}
          x={textX ? textX : centerX}
          y={textY ? textY : centerY}
          textAnchor="middle"
          className={'circletext ' + (!this.hasParent() ? 'shown' : '') + ' ' + (!this.props.isShown ? ' hidden' : 'shown') }
          onClick={focusCircle}
        >
          <tspan x={textX ? textX : centerX} fill={textColor} style={{ fontSize }} dy="0em">{name}</tspan>
          <tspan x={textX ? textX : centerX} fill={textColor} style={{ fontSize }} dy="1.6em">
            { noValueList.indexOf(id) > -1 ? '' : 'Data: Value' }
          </tspan>
          { id === 'long_term_money' && <tspan fill={color.stroke} y={textY ? textY + 0.2 : centerY + 0.2 } className="refresh-icon">&#xf0e2;</tspan>}
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

  getExtendedValue(value) {
    return this.state.isMouseInside ? value * 1.1 : value;
  }

  renderShape(shownClass) {
    const id = this.props.nodeID;
    let { shape, centerX, centerY, radiusX, radiusY, radius, name, scaleFactor, color, width, height, rotate, ratio } = this.props;
    radius = ratio ? ratio * radius : radius;

    if (shownClass === 'hidden') {
      centerX = this.props.parentCenterX;
      centerY = this.props.parentCenterY;
    } else if (this.hasParent() && shownClass === '') {
      centerX = this.props.parentCenterX;
      centerY = this.props.parentCenterY;
    }

    return (
      <Mutation mutation={setCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
        {focusCircle => {
          const circleColor = {
            stroke: color && color.stroke ? color.stroke : 'grey',
            fill: color && color.bg ? color.bg : 'grey'
          };
          return (
            <React.Fragment>
              {
                ellipseGroup.indexOf(shape) > -1 &&
                <ellipse
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode ellipse"
                  cx={centerX}
                  cy={centerY}
                  rx={this.getExtendedValue(radiusX)}
                  ry={this.getExtendedValue(radiusY)}
                  strokeWidth={radius * scaleFactor / 40}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                >
                </ellipse>
              }
              {
                rectGroup.indexOf(shape) > -1 &&
                <rect
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode rectangle"
                  x={centerX}
                  y={centerY}
                  width={width}
                  height={height}
                  transform={`rotate(${rotate ? rotate : 0})`}
                  rx={`${radiusX ? radiusX : radiusX}`}
                  ry={`${radiusY ? radiusY : radiusY}`}
                  strokeWidth={0.2}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                />
              }
              {
                circleGroup.indexOf(shape) > -1 &&
                <circle
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode"
                  cx={centerX}
                  cy={centerY}
                  r={this.getExtendedValue(radius) * scaleFactor}
                  strokeWidth={radius * scaleFactor / 20}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                />
              }
              {this.getInsideElements(name, centerX, centerY, focusCircle)}
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }

  render() {
    /** Position for the node */
    let centerX = this.props.centerX, centerY = this.props.centerY;

    let parentNode = '';
    if (typeof(this.props.nodeData) !== undefined && this.props.nodeData.length > 0) {
      parentNode = <g
        id={ this.props.nodeID ? `${this.props.nodeID}-children` : '' }
      >
        { this.props.nodeData.map(data => {
          return <RadialNode
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

            isShown={this.state.isRevealed /* The prop means whether the node is being rendered right now by its parent */}
            wasParentClickedAtLeastOnce={this.state.wasClickedAtLeastOnce /* Whether the parent of the node was clicked at least once (is used for initial animations) */}
          />
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
        <g
          id={ this.props.nodeID ? `${this.props.nodeID}-group` : '' }
          className='radial-group'
        >
          <g
            ref={this.elCircleGroup}
            id={`${this.props.nodeID}-circle`}
            className={'circle-group ' + immersionClass + ' ' + shownClass + ' ' + afterHiddenClass}
            onDoubleClick={this.handleDoubleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            { this.renderShape(shownClass) }
          </g>
          {parentNode}
        </g>
    );
    }
  }

RadialNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  shape: PropTypes.string,
  centerX: PropTypes.node.isRequired,
  centerY: PropTypes.node.isRequired,
  color: PropTypes.object,
  fields: PropTypes.array.isRequired
};

//export default withApollo(RadialNode);
//export default React.forwardRef((props, ref) => <RadialNode updateFocus={ref} {...props}/>);
export default RadialNode;
