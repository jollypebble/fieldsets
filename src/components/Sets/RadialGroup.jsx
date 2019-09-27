import React from 'react';
import Cone from './Cone';
import * as Gradient from './Gradient';

const RadialGroup = ({ id, active, visibility, attributes }) => {
  return (
    <React.Fragment>
      <defs>
        { Gradient[attributes.gradientId]() }
      </defs>
      <Cone
        id={id}
        attributes={attributes}
      />
    </React.Fragment>
  );
}

export default RadialGroup;
