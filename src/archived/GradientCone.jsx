import React from 'react';

const GradientCone = ({ id, active, visibile, variables, handlers }) => {
  const defaults = {
    width: 50,
    height: 50,
    rotate: 0,
    textX: false,
    textY: false
  };

  return (
    <React.Fragment>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${id}-gradientcone`}>
          <stop className="gradient-start" offset="0%"></stop>
          <stop className="gradient-stop" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        d={variables.attributes.path}
        style={{ fill: `url(#${id}-gradientcone)` }}
      />
    </React.Fragment>
  );
}

export default GradientCone;
