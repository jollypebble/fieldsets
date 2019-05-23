import React from 'react';

const Cone = ({ attributes }) => {
  return (
    <React.Fragment>
      <path
        d={attributes.path}
        style={{ fill: `url(#${attributes.gradientId}` }}
      />
    </React.Fragment>
  );
}

export default Cone;
