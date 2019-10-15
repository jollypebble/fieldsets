import React from 'react';
import SVGLabel from './Labels/SVGLabel';

const Circle = ({id, active, variables}) => {
  const defaults = {
    radius: 7.5,
    ratio: 1,
    strokeWidth: 1
  };

  let {ratio, radius, textX, textY, strokeWidth} = {...defaults, ...variables.attributes};

  const parent = variables.parent;
  const hasParent = (parent) ? true : false;

  const center = variables.center;
  const centerX = center.x;
  const centerY = center.y;

  const visible = variables.visible;

  radius = ((active) ? radius * 1.1 : radius) * variables.zoom.scale;
  radius = ratio * radius;

  textX = (textX) ? textX : centerX;
  textY = (textY) ? textY : centerY;

  /**
   * Circle Text is set to center.
   */
  variables.attributes.textX = textX;
  variables.attributes.textY = textY;

  return (
    <React.Fragment>
      <circle
        id={id}
        className="setview-circle"
        cx={centerX}
        cy={centerY}
        r={radius}
        strokeWidth={strokeWidth}
        onClick={() => {return}}
      />
      <SVGLabel
        id={`${id}-label`}
        className="setview-label setview-circle-label"
        name={variables.name}
        active={active}
        visible={visible}
        variables={variables}
      />
    </React.Fragment>
  );
}

export default Circle;
