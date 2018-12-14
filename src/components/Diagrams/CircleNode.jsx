/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';

export default class CircleNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      isMouseInside: false,
      viewer: null,
      lastX: null,
      lastY: null,
      lastZoom: null
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      return;
    }, 10);
  }

  handleMouseEnter() {
    //this.Viewer.setPointOnViewerCenter(this.props.startx, this.props.starty, 35);
    this.setState({ isMouseInside: true});
  }
  handleMouseLeave() {
    //this.Viewer.setPointOnViewerCenter(this.props.startx, this.props.starty, 35);
    this.setState({ isMouseInside: false});
  }

  toggleChildren() {
    //const groupname = `${this.props.nodeID}-group`;
    //const childGroup = document.getElementById(groupname).
    //childGroup.setState({ isHidden: !childGroup.state.isHidden });
  }

  render() {
    const {
      nodeData,
      nodeID,
      startx,
      starty,
      radius,
    } = this.props;

    const titleID = `${nodeID}-title`;
    const circleID = `${nodeID}`;

    return (
        <circle
          id={circleID}
          className='circlenode'
          cx={startx}
          cy={starty}
          r={radius}
          fill="grey"
          stroke="grey"
          strokeWidth={this.state.isMouseInside ? radius*2 : radius}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.toggleChildren.bind(this)}
        />
    );
  }
}

CircleNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  startx: PropTypes.node,
  starty: PropTypes.node
};
