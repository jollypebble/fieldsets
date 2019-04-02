import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { setCurrentFocus } from '../../graphql';

/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */
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
      if (this.hasParent()) this.props.openDialog(this.props.nodeID);
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
    const { textX, textY, color, scaleFactor } = this.props;
    let textColor = color && color.text ? color.text : '#515359';
    const textSize = (0.4 * scaleFactor) + 'pt';
    return <text
      ref={this.elCircleText}
      x={textX ? textX : centerX}
      y={textY ? textY : centerY}
      textAnchor="middle"
      className={'circletext ' + (!this.hasParent() ? 'shown' : '') + ' ' + (!this.props.isShown ? ' hidden' : '') }
      onClick={focusCircle}
    >
      <tspan x={textX ? textX : centerX} fill={textColor} style={{ fontSize: textSize }} dy="0em">{name}</tspan>
      <tspan x={textX ? textX : centerX} fill={textColor} style={{ fontSize: textSize }} dy="1.6em">{ 'Data: Value' }</tspan>
    </text>
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

   renderShape(shownClass) {
    const id = this.props.nodeID;
    let { shape, centerX, centerY, radiusX, radiusY } = this.props;

    if (shownClass === 'hidden') {
      centerX = this.props.parentCenterX
      centerY = this.props.parentCenterY
    } else if (this.hasParent() && shownClass === '') {
      centerX = this.props.parentCenterX
      centerY = this.props.parentCenterY
    }

    return (
      <Mutation mutation={setCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
        {focusCircle => {
          let circleColor = {}
          circleColor.stroke = this.props.color && this.props.color.bg ? this.props.color.bg : 'grey'
          circleColor.fill = circleColor.stroke
          return (
            <React.Fragment>
              {
                shape === 'ellipse' &&
                <ellipse
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode"
                  cx={centerX}
                  cy={centerY}
                  rx={radiusX}
                  ry={radiusY}
                  // r={this.props.radius * this.props.scaleFactor}
                  strokeWidth={(this.state.isMouseInside ? this.props.radius * 1.35 : this.props.radius) * this.props.scaleFactor}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                />
              }
              {
                shape === 'rectangle' &&
                <rect
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode"
                  x={centerX}
                  y={centerY}
                  width={10}
                  height={5}
                  strokeWidth={(this.state.isMouseInside ? this.props.radius * 1.35 : this.props.radius) * this.props.scaleFactor}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                />
              }
              {
                shape !== 'ellipse' && shape !== 'rectangle' &&
                <circle
                  ref={this.elCircleNode}
                  id={id}
                  className="circlenode"
                  cx={centerX}
                  cy={centerY}
                  r={this.props.radius * this.props.scaleFactor}
                  strokeWidth={(this.state.isMouseInside ? this.props.radius * 1.35 : this.props.radius) * this.props.scaleFactor}
                  onClick={focusCircle}
                  {...this.getAdditionalCircleProps()}
                  {...circleColor}
                />
              }
              {this.getInsideElements(this.props.name, centerX, centerY, focusCircle)}
            </React.Fragment>
          );
        }}
      </Mutation>
     );
   }

   render() {
    /** Position for the node */
    let centerX = this.props.centerX, centerY = this.props.centerY

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
            shape={ data.shape }
            centerX={ data.centerX }
            centerY={ data.centerY }
            name={ data.name }
            parent={ data.parent }
            fields={ data.fields }
            color={ data.color }

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
    const afterHiddenClass = this.hasParent() && shownClass === '' ? 'afterHidden' : ''

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
