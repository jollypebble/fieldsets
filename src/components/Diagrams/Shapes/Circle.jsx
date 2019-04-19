import React from 'react';

const Circle = ({id, active, visibility, attributes, scaleFactor}) => {
  const {ratio, parentCenterX, parentCenterY, parent} = attributes;
  let radius = ((active) ? attributes.radius * 1.1 : attributes.radius) * scaleFactor;
  const hasParent = (parent && parent !== '') ? true : false;
  let {centerX, centerY, strokeWidth} = attributes;

  // Ensure centers are set to parent in proper instances.
  if (visibility === 'hidden' || (hasParent && visibility === '')) {
    centerX = parentCenterX;
    centerY = parentCenterY;
  }
  radius = ratio ? ratio * radius : radius;
  if ( ! strokeWidth ) {
    strokeWidth = radius / 40;
  }

  return (
    <React.Fragment>
      <circle
        id={id}
        className="circlenode"
        cx={centerX}
        cy={centerY}
        r={radius}
        strokeWidth={strokeWidth}
        onClick={attributes.focusCircle}
      />
    </React.Fragment>
  );
}

export default Circle;
