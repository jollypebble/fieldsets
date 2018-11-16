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
      childrenData
    } = this.props;
    return (
      <g>
        {childrenData.map(child => (
          <ellipse key={ child.id } cx="150" cy="150" r="40" stroke="black" strokeWidth="3" fill="green">
            <NodeLabel
              nodeData={ child }
            />
          </circle>
        ))}
      </g>
    );
  }
}
ChildNode.propTypes = {
  childrenData: PropTypes.array.isRequired,
};

export default ChildNode;
