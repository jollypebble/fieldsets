import React from 'react';
import Shape from '../Shape';

const RadialGroup = ({id, active, visibility, attributes}) => {

  return (
    <React.Fragment>
    <defs>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="Gradient2" >
        <stop offset="0%" style={{stopColor: '#ccffff'}} />
        <stop offset="70%" style={{stopColor: '#fff'}} />
      </linearGradient>
    </defs>
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
