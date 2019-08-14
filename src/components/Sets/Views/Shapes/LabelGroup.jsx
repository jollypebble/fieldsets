import React from 'react';
import Cone from './Cone';
import * as Gradients from './Gradients';

const LabelGroup = ({ id, active, visibility, attributes }) => {
  return (
    <React.Fragment>
      <defs>
        { Gradients[attributes.gradientId]() }
      </defs>
      <Cone
        id={id}
        attributes={attributes}
      />
    </React.Fragment>
  );
}

export default LabelGroup;
