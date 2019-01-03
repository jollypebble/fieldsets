/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import { Query, Mutation } from "react-apollo";

import { GET_ALLTODOS, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO } from '../../queries';

import { CircleNode } from 'components/Diagrams'

export default class RadialNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      showChildren: true,
      expand: 'down'
    }
    this.Viewer = null;

    this.dom = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.Viewer = this.refs.Viewer;
    }, 10);
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
      startx,
      starty,
      radius
    } = this.props;

    const childRadius = radius/2;
    // Child Node
    if (typeof(nodeData) !== undefined) {
      return (
        <React.Fragment>
          <CircleNode
            nodeID={ nodeID }
            startx={ startx }
            starty={ starty }
            radius={ radius }
            ref={Viewer => this.Viewer = Viewer}
          />
          <g id={ nodeID ? `${nodeID}-children` : '' } >
            { nodeData.map(data => (
              <g
                id={ data.id ? `${data.id}-group` : '' }
                key={ data.id }
              >
                  <RadialNode
                    nodeData={ typeof(data.children) === undefined ? [] : data.children }
                    nodeID={ data.id }
                    startx={ data.startx }
                    starty={ data.starty }
                    radius={ childRadius }
                    ref={Viewer => this.Viewer = Viewer}
                  />
              </g>
            )) }
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
              startx={ startx }
              starty={ starty }
              radius={ childRadius }
              ref={Viewer => this.Viewer = Viewer}
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
  startx: PropTypes.node,
  starty: PropTypes.node,
  move: PropTypes.node
};
