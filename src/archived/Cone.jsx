import React from 'react';

const Cone = ({ id, active, visibile, variables, handlers }) => {
  return (
    <React.Fragment>
      <path
        d={variables.attributes.path}
        style={{ fill: `url(#${attributes.gradientId}` }}
      />
    </React.Fragment>
  );
}

export default Cone;
