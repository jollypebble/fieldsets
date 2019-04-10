import React from 'react';

const Ellipse = ({id, active, visibility, attributes}) => {
  const {ratio, parentCenterX, parentCenterY, scaleFactor, parent} = attributes;
  let radiusX = (active) ? attributes.radiusX * 1.1 : attributes.radiusX;
  let radiusY = (active) ? attributes.radiusY * 1.1 : attributes.radiusY;

  const hasParent = (parent && parent !== '') ? true : false;
  let {radius, centerX, centerY, strokeWidth} = attributes;

  // Ensure centers are set to parent in proper instances.
  if (visibility === 'hidden' || (hasParent && visibility === '')) {
    centerX = parentCenterX;
    centerY = parentCenterY;
  }

  radius = ratio ? ratio * radius : radius;

  if ( ! strokeWidth ) {
    strokeWidth = radius * scaleFactor / 40;
  }

  return (
    <React.Fragment>
      <ellipse
        id={id}
        className="circlenode ellipse"
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth}
        onClick={attributes.focusCircle}
      >
      </ellipse>
    </React.Fragment>
  );
}

export default Ellipse;
