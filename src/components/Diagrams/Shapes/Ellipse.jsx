import React from 'react';

const Ellipse = ({id, active, visibility, attributes}) => {
  const {ratio, parentCenterX, parentCenterY, parent} = attributes;
  let radiusX = (active) ? attributes.radiusX * 1.1 : attributes.radiusX;
  let radiusY = (active) ? attributes.radiusY * 1.1 : attributes.radiusY;

  // Use the circle radius default value(7.5) for stroke withd.
  const defaultRadius = 7.5;
  let radius = (active) ? defaultRadius * 1.1 : defaultRadius;

  const hasParent = (parent && parent !== '') ? true : false;
  let {centerX, centerY, strokeWidth, gradientId} = attributes;

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
      <ellipse
        id={id}
        className="circlenode ellipse"
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth}
        onClick={attributes.focusCircle}
        // style={{ fill: `url(#${gradientId}` }}
      >
      </ellipse>
    </React.Fragment>
  );
}

export default Ellipse;
