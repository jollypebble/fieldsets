import React from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from "react-apollo";

import { CircleNode } from 'components/Diagrams';
/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */
 class RadialNode extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       boundingBox: null,
     };
     this.group = React.createRef();
     this.getBoundingBox = this.getBoundingBox.bind(this);
   }

   /**
    * After render get group bounding box in SVG.
    */
   componentDidMount() {
     setTimeout(() => {
       this.getBoundingBox();
     }, 10);
   }

   getBoundingBox = () => {
     /**
     const boundingBox = this.group.current.getBBox();
     this.setState({ boundingBox: boundingBox });
     */
   }

   render() {
      const {
        nodeData,
        nodeID,
        centerX,
        centerY,
        radius
      } = this.props;
      // Scale factor might be able to be a prop.
      const childRadius = radius * 0.5;
      // Child Node
      if (typeof(nodeData) !== undefined && nodeData.length > 0) {
        return (
          <React.Fragment>
            <g
              id={ nodeID ? `${nodeID}-group` : '' }
              ref={(ref) => this.group = ref}
            >
              <CircleNode
                nodeID={ nodeID }
                centerX={ centerX }
                centerY={ centerY }
                radius={ radius }
              />
              <g id={ nodeID ? `${nodeID}-children` : '' } >
                { nodeData.map(data => (
                      <RadialNode
                        nodeData={ typeof(data.children) === undefined ? [] : data.children }
                        nodeID={ data.id }
                        centerX={ data.centerX }
                        centerY={ data.centerY }
                        radius={ childRadius }
                        key={ data.id }
                      />
                )) }
              </g>
            </g>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <g
              id={ nodeID ? `${nodeID}-group` : '' }
            >
              <CircleNode
                nodeID={ nodeID }
                centerX={ centerX }
                centerY={ centerY }
                radius={ radius }
              />
            </g>
          </React.Fragment>
        );
      }
    }
}
RadialNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired,
  centerX: PropTypes.node,
  centerY: PropTypes.node,
  move: PropTypes.node
};
export default withApollo(RadialNode);
