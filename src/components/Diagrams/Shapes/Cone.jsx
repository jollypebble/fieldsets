import React from 'react';

const Cone = ({attributes}) => {
  const {radiusX, radiusY, width, height, parentCenterX, parentCenterY, parent, rotate, gradientId} = attributes;
  let { path, textX, textY, transform1, transform2 } = attributes;

  return (
    <React.Fragment>
      <g transform={transform1}>
        <g transform={transform2}>
          <path
            d={attributes.path}
            // style={{ fill: `url(#${gradientId}` }}
            style={{ fill: attributes.gradientId ? `url(#${attributes.gradientId}` : null }}
          />
        </g>
      </g>
    </React.Fragment>
  );
}

export default Cone;
