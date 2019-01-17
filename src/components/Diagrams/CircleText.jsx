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
      <React.Fragment>
      </React.Fragment>
    );
  }
}

CircleText.propTypes = {
  nodeID: PropTypes.string,
  centerX: PropTypes.node,
  centerY: PropTypes.node
};

export default withApollo(CircleText);
