import React from 'react';
import Ellipse from './Ellipse';
import * as Gradients from 'config/data/Gradients';

const LabelGroup = ({id, active, visibility, attributes}) => {
  return (
    <React.Fragment>
      <defs>
        { Gradients[attributes.gradientId]() }
      </defs>
      <Ellipse
        id={id}
        active={active}
        visibility={visibility}
        attributes={attributes}
      />
    </React.Fragment>
  );
}

export default LabelGroup;
