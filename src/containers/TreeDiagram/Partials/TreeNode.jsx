/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import NodeLabel from './NodeLabel';
import ParentNode from './ParentNode';
import ChildNode from './ChildNode';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.dom = {};
  }

  componentWillEnter(callback) {
    this.dom.root = ReactDom.findDOMNode(this);
    TweenMax.fromTo(this.dom.root, 0.3, { y: -100, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
  }
  componentWillLeave(callback) {
    this.dom.root = ReactDom.findDOMNode(this);
    TweenMax.fromTo(this.dom.root, 0.3, { y: 0, opacity: 1 }, { y: -100, opacity: 0, onComplete: callback });
  }

  render() {
    const {
      nodeData,
      nodeID,
      showChildren,
      position
    } = this.props;

    // Child Node
    if (nodeData === undefined) {
      return (
        <ChildNode
          nodeID={ nodeID }
          position={ position }
        />
      );
    }

    // Parent Node
    return (
      <g
        id={ nodeID }
      >
        <path id={ nodeID } d={ position } />
        { nodeData.map(data => (
          <g
            id={ data.id }
            key={ data.id }
          >
            <NodeLabel
              nodeID={ data.id }
              nodeData={ data }
              handleUpdate={ this.handleUpdate }
              handleCollapse={ this.handleCollapse }
              isParent
            />
            if (data.children !== undefined) {
              <ParentNode
                nodeData={ data.children }
                nodeID={ data.id }
                showChildren={ showChildren }
              />
            }
          </g>
        )) }
      </g>
    );
  }
}
TreeNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired,
  position: PropTypes.node.isRequired,
  showChildren: PropTypes.bool
};

export default TreeNode;
