import React from 'react';

const Rectangle = ({id, visibility, attributes, gradient}) => {
  const {radiusX, radiusY, width, height, parentCenterX, parentCenterY, parent, rotate} = attributes;
  let {centerX, centerY, strokeWidth} = attributes;
  const hasParent = (parent && parent !== '') ? true : false;

  // Ensure centers are set to parent in proper instances.
  if (visibility === 'hidden' || (hasParent && visibility === '')) {
    centerX = parentCenterX;
    centerY = parentCenterY;
  }

  return (
    <React.Fragment>
      <rect
        id={id}
        className="circlenode rectangle"
        x={centerX}
        y={centerY}
        width={width}
        height={height}
        transform={`rotate(${rotate ? rotate : 0})`}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth ? strokeWidth : 0.1}
        onClick={attributes.focusCircle}
      />
    </React.Fragment>
  );
}

export default Rectangle;
