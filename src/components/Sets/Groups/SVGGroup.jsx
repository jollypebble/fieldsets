import React from 'react';

const SVGGroup = ({id, setview, className, children}) => {
  return(
    <g
      id={`${id}`}
      className={`${className}`}
    >
      {children}
    </g>
  );
}
export default SVGGroup;
