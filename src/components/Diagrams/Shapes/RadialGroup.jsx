import React from 'react';
import Shape from '../Shape';

const RadialGroup = ({id, active, visibility, attributes}) => {

  return (
    <React.Fragment>
      <Shape
        id={id}
        shape="Rectangle"
        active={active}
        visibility={visibility}
        attributes={attributes}
      />
    </React.Fragment>
  );
}

export default RadialGroup;
