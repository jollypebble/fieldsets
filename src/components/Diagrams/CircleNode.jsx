import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, withApollo } from 'react-apollo';
import { CircleText} from 'components/Diagrams';
import { focusCircleQuery } from '../../graphql';

/**
 * Circular nodes are the visually rendered components. We use their state for tracking the mouse pointer.
 * Clicking on a circular node mutates the current focus cache item.
 */
class CircleNode extends React.Component {
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
    this.setState({ isMouseInside: true});
  }
  handleMouseLeave() {
    this.setState({ isMouseInside: false});
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
      <Mutation mutation={focusCircleQuery} variables={{ id, centerX, centerY }}>
        {focusCircle => (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

CircleNode.propTypes = {
  nodeID: PropTypes.string.isRequired,
  centerX: PropTypes.node,
  centerY: PropTypes.node
};

export default withApollo(CircleNode);
