import React from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from "react-apollo";

/**
 * Circular nodes are the visually rendered components. We use their state for tracking the mouse pointer.
 * Clicking on a circular node mutates the current focus cache item.
 */
class CircleText extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    setTimeout(() => {
    }, 10);
  }

  render() {
    const {
      nodeID,
      centerX,
      centerY,
      radius
    } = this.props;

    const id = `${nodeID}`;

    return (
      <svg>
        <g id="textarea-1" className="selectable list contextmenu circletext" transform="translate(18,18)">
          <rect x={0} y={0} width={1} height={1} className="background"></rect>
          <text x={0} y={7}>
            <tspan dy={9} x={0} dx={20}>Apples</tspan>
          </text><circle cx={14} cy={13.6} r={1.2000000000000002}></circle>
        </g>
      </svg>
    );
  }
}

CircleText.propTypes = {
  nodeID: PropTypes.string,
  centerX: PropTypes.node,
  centerY: PropTypes.node
};

export default withApollo(CircleText);
