/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import NodeLabel from './NodeLabel';

class ChildNode extends Component {
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
      nodeID,
      position
    } = this.props;
    return (
      <g
        id={ nodeID }
      >
        <path id={ nodeID } d={ position } />
        <NodeLabel
          nodeID={ nodeID }
          handleUpdate={ this.handleUpdate }
          handleCollapse={ this.handleCollapse }
        />
      </g>
    );
  }
}
ChildNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  position: PropTypes.node.isRequired,
};

export default ChildNode;
