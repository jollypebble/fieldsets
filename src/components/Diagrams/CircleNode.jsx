/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const FOCUS_CIRCLE = gql`
  mutation FocusCircle($id: String!, $centerX: Float!, $centerY: Float!) {
    focusCircle(id: $id, centerX: $centerX, centerY: $centerY) @client
  }
`;

export default class CircleNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
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

  render() {
    const {
      nodeData,
      nodeID,
      startx,
      starty,
      radius
    } = this.props;

    const id = `${nodeID}`;
    const centerX = startx;
    const centerY = starty;

    return (
      <Mutation mutation={FOCUS_CIRCLE} variables={{ id, centerX, centerY }}>
        {focusCircle => (
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
        )}
      </Mutation>
    );
  }
}

CircleNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  startx: PropTypes.node,
  starty: PropTypes.node
};
