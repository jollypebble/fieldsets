import React from 'react';
import {
  Button,
  DialogContainer,
  TextField,
  SelectionControl,
  SelectionControlGroup,
} from 'react-md';
import PropTypes from 'prop-types';
import { Query, Mutation, graphql } from 'react-apollo';
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
   }

   componentDidMount() {
     this.updateNodeData();
   }

   componentDidUpdate() {
   }

   handleMouseEnter() {
     this.setState({ isMouseInside: true});
   }
   handleMouseLeave() {
     this.setState({ isMouseInside: false});
   }

   handleClick() {
     const {
       nodeID,
       centerX,
       centerY
     } = this.props;
     this.props.updateFocus(nodeID, centerX, centerY);
   }

   handleDoubleClick = () => {
     const {
       nodeID,
       centerX,
       centerY
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

   updateNodeData() {
     const {
       nodeData,
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
      name,
      fields,
      parent,
      centerX,
      centerY,
      radius,
      updateFocus,
      resetFocus
    } = this.props;

    // Scale factor might be able to be a prop.
    const childRadius = radius * 0.5;

    const id = `${nodeID}`;

    let parentNode = '';
    if (typeof(nodeData) !== undefined && nodeData.length > 0) {
      parentNode = <g id={ nodeID ? `${nodeID}-children` : '' }  >
        { nodeData.map(data => (
          <RadialNode
            key={ data.id }
            nodeData={ typeof(data.children) === undefined ? [] : data.children }
            nodeID={ data.id }
            centerX={ data.centerX }
            centerY={ data.centerY }
            radius={ childRadius }
            name={ data.name }
            parent={ data.parent }
            fields={ data.fields }
            updateFocus={updateFocus}
            resetFocus={ this.props.resetFocus }
            openDialog={ this.props.openDialog }
            setNodeState={ this.props.setNodeState }
            nodes={this.props.nodes}
          />
        )) }
      </g>;
    }


    const { visible, initialFocus, focusOnMount, containFocus } = this.state;

    // Child Node
    return (
        <g
          id={ nodeID ? `${nodeID}-group` : '' }
          className='radial-group'
        >
          <g
            id={`${nodeID}-circle`}
            className='circle-group'
            onDoubleClick={this.handleDoubleClick}
          >
            <Mutation mutation={setCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
              {focusCircle => (
                <React.Fragment>
                  <circle
                    id={id}
                    className='circlenode'
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="grey"
                    stroke="grey"
                    strokeWidth={this.state.isMouseInside ? radius*2 : radius}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={focusCircle}
                  />
                  <text
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    className='circletext'
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={focusCircle}
                  >
                    <tspan x={centerX} dy=".6em">{name}</tspan>
                    <tspan x={centerX} dy="1.2em">Data: Value</tspan>
                  </text>
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
