import React from 'react';

const Rectangle = ({id, visibility, attributes, gradient, onClick}) => {
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
        className="circleset rectangle"
        x={centerX}
        y={centerY}
        width={width}
        height={height}
        transform={`rotate(${rotate ? rotate : 0})`}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth ? strokeWidth : 1}
        onClick={onClick}
      />
    </React.Fragment>
  );
}

export default Rectangle;
