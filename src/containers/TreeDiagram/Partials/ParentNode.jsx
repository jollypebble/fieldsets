/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import TreeNode from './TreeNode';

class ParentNode extends Component {
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
      showChildren
    } = this.props;
    return (
      <svg id={ nodeID } showChildren={ showChildren }>
        { nodeData.map(data => (
          <TreeNode
            key={ data.id }
            nodeData={ data.children }
            nodeID={ data.id }
            showChildren={ showChildren }
          />
        )) }
      </svg>
    );
  }
}
ParentNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired,
  showChildren: PropTypes.bool
};

export default ParentNode;
