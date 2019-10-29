import React from 'react';

const Ellipse = ({id, active, visibility, attributes, onClick}) => {
  const {ratio, parentCenterX, parentCenterY, parent} = attributes;
  let radiusX = (active) ? attributes.radiusX * 1.1 : attributes.radiusX;
  let radiusY = (active) ? attributes.radiusY * 1.1 : attributes.radiusY;

  // Use the circle radius default value(7.5) for stroke withd.
  const defaultRadius = 7.5;
  let radius = (active) ? defaultRadius * 1.1 : defaultRadius;

  const hasParent = (parent && parent !== '') ? true : false;
  let {centerX, centerY, strokeWidth} = attributes;

  // Ensure centers are set to parent in proper instances.
  if (visibility === 'hidden' || (hasParent && visibility === '')) {
    centerX = parentCenterX;
    centerY = parentCenterY;
  }

  radius = ratio ? ratio * radius : radius;

  if ( ! strokeWidth ) {
    strokeWidth = radius / 6;
  }

  return (
    <React.Fragment>
      <ellipse
        id={id}
        className="circleset ellipse"
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth}
        onClick={onClick}
      >
      </ellipse>
    </React.Fragment>
  );
}

export default Ellipse;