import React from 'react';
import RadialNode from '../RadialNode'

/**
 * Net Worth circle node.
 */
export default class NetWorthNode extends RadialNode {
  constructor(props) {
    super(props);

    this.additionalCircleProps = {
      r: 2.5
    }
  }

  getAdditionalCircleProps() {
    return this.additionalCircleProps
  };

  getInsideElements(name, centerX, centerY, focusCircle) {
    return <text
      ref={this.elCircleText}
      x={centerX}
      y={centerY}
      textAnchor="middle"
      className={'circletext ' + (!this.hasParent() ? 'shown' : '') + ' ' + (!this.props.isShown ? ' hidden' : '') }
      onClick={focusCircle}
    >
      <tspan className="amount" style={{ fontSize: '0.4pt' }} x={centerX} dy="-0.3em">$38,742,994</tspan>
      <tspan className="label"  style={{ fontSize: '0.4pt' }} x={centerX} dy="2em">{name}</tspan>
    </text>
  };

}