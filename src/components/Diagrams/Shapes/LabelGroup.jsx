import React from 'react';
import Shape from '../Shape';

const LabelGroup = ({id, active, visibility, attributes}) => {
  return (
    <React.Fragment>
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="Gradient" >
          <stop offset="10%" style={{stopColor: '#fff'}} />
          <stop offset="100%" style={{stopColor: '#9bff9b'}} />
        </linearGradient>
      </defs>
      <Shape
        id={id}
        shape="Triangle"
        active={active}
        visibility={visibility}
        attributes={attributes}
      />
    </React.Fragment>
  );
}

export default LabelGroup;
