import React from 'react';

const Circle = ({id, active, visibility, attributes, scaleFactor, onClick}) => {
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
    strokeWidth = radius / 30;
  }

  return (
    <React.Fragment>
      <circle
        id={id}
        className="circleset"
        cx={centerX}
        cy={centerY}
        r={radius}
        strokeWidth={strokeWidth}
        onClick={onClick}
      />
    </React.Fragment>
  );
}

export default Circle;