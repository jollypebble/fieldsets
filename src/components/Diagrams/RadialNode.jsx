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
       visible: false,
       isRevealed: false, // the prop means whether the node is rendering its chilren nodes right now. All sub-nodes are hidden from the very beginning
       wasClickedAtLeastOnce: false, // whether the node was clicked at least once (is used for initial animations)
       focusOnMount: true,
       containFocus: true,
       initialFocus: undefined
     };

     this.handleMouseEnter = this.handleMouseEnter.bind(this);
     this.handleMouseLeave = this.handleMouseLeave.bind(this);
     this.handleClick = this.handleClick.bind(this);

     this.handleTargetChange = this.handleTargetChange.bind(this);
     this.handleMountChange = this.handleMountChange.bind(this);
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
     // anvoevodin: It's commented because zooming/scaling is baggy now and I need to make animations. Bags interfere
     // const {
     //   nodeID,
     //   centerX,
     //   centerY
     // } = this.props;
     // this.props.updateFocus(nodeID, centerX, centerY);

     this.setState({
      wasClickedAtLeastOnce: true,
      isRevealed: !this.state.isRevealed
     })
   }

   /** Is called when we doubleclick on the radial node */
   handleDoubleClick = () => {
     const {
       nodeID
     } = this.props;
     // TODO: OPEN DIALOG AND SET FIELDS TO DISPLAY
     this.props.openDialog(nodeID);
   }

   handleTargetChange = (value) => {
     this.setState({ initialFocus: value ? `#${value}` : undefined });
   };

   handleMountChange = (checked) => {
     this.setState({ focusOnMount: checked });
   };

   handleFocusChange = (checked) => {
     this.setState({ containFocus: checked });
   };

   /** Extra properties that will be passed into Circle instance. It's for beign overrided by sub-classes. */
   getAdditionalCircleProps() { return null };
   getInsideElements(name, centerX, centerY, focusCircle) {
    return <text
      ref={this.elCircleText}
      x={centerX}
      y={centerY}
      textAnchor="middle"
      className={'circletext ' + (!this.hasParent() ? 'shown' : '') + ' ' + (!this.props.isShown ? ' hidden' : '') }
      onClick={focusCircle}
    >
      <tspan x={centerX} dy="0em">{name}</tspan>
      <tspan x={centerX} dy="1.6em">{ 'Data: Value' }</tspan>
    </text>
   }

   updateNodeData() {
     const {
       nodeID,
       name,
       fields,
       parent,
       centerX,
       centerY,
       setNodeState,
       nodes
     } = this.props;

     // TODO GET BOUNDING BOX HERE:

     // Emulate Circle Appollo Data Type in `graphql/typeDefs.js`
     const nodedata = {
       id: nodeID,
       name: name,
       fields: fields,
       parent: parent,
       centerX: centerX,
       centerY: centerY
     };

     let updatedNodeList = nodes;
     updatedNodeList[nodeID] = nodedata;

     setNodeState(updatedNodeList); // Sets the top level Diagram node array.
     return this.state.nodes;
   }

   render() {
    const {
      nodeData,
      nodeID,
      radius,
      name,
      updateFocus,
      resetFocus
    } = this.props;
    /** Position for the node */
    let centerX = this.props.centerX, centerY = this.props.centerY

    // Scale factor might be able to be a prop.
    const childRadius = radius * 0.5;

    const id = `${nodeID}`;

    let parentNode = '';
    if (typeof(nodeData) !== undefined && nodeData.length > 0) {
      parentNode = <g
        id={ nodeID ? `${nodeID}-children` : '' }
      >
        { nodeData.map(data => {
          return <RadialNode
            key={ data.id }
            nodeData={ typeof(data.children) === undefined ? [] : data.children }
            nodeID={ data.id }
            centerX={ data.centerX }
            centerY={ data.centerY }
            parentCenterX={ centerX }
            parentCenterY={ centerY }
            radius={ childRadius }
            name={ data.name }
            parent={ data.parent }
            fields={ data.fields }
            updateFocus={ updateFocus }
            resetFocus={ resetFocus }
            openDialog={ this.props.openDialog }
            setNodeState={ this.props.setNodeState }
            nodes={this.props.nodes}
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
    if (shownClass === 'hidden') {
      centerX = this.props.parentCenterX
      centerY = this.props.parentCenterY
    } else if (this.hasParent() && shownClass === '') {
      centerX = this.props.parentCenterX
      centerY = this.props.parentCenterY
    }

    // Child Node
    return (
        <g
          id={ nodeID ? `${nodeID}-group` : '' }
          className='radial-group'
        >
          <g
            ref={this.elCircleGroup}
            id={`${nodeID}-circle`}
            className={'circle-group ' + immersionClass + ' ' + shownClass + ' ' + afterHiddenClass}
            onDoubleClick={this.handleDoubleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <Mutation mutation={setCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
              {focusCircle => (
                <React.Fragment>
                  <circle
                    ref={this.elCircleNode}
                    id={id}
                    className="circlenode"
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    strokeWidth={this.state.isMouseInside ? radius * 1.35 : radius}
                    onClick={focusCircle}
                    {...this.getAdditionalCircleProps()}
                  />
                  {this.getInsideElements(name, centerX, centerY, focusCircle)}
                </React.Fragment>
              )}
            </Mutation>
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
  centerX: PropTypes.node.isRequired,
  centerY: PropTypes.node.isRequired,
  fields: PropTypes.array.isRequired
};

//export default withApollo(RadialNode);
//export default React.forwardRef((props, ref) => <RadialNode updateFocus={ref} {...props}/>);
export default RadialNode;
