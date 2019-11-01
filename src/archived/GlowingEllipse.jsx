import React from 'react';
import Ellipse from './Ellipse';

const GlowingEllipse = ({id, view, active, variables}) => {
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
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" id={`${id}-radialgradient`} className="radialgradient">
          <stop className="gradient-start" offset="0%"></stop>
          <stop className="gradient-stop" offset="100%"></stop>
        </radialGradient>
        <ellipse
          id={`${id}-glowingellipse`}
          cx={ variables.center.x }
          cy={ variables.center.y }
          rx={200}
          ry={125}
        />
      </defs>
      <use xlinkHref={`#${id}-glowingellipse`} style={{ fill: `url(#${id}-radialgradient)`, pointerEvents: 'none' }} />
      <Ellipse
        id={`${id}-view`}
        active={active}
        variables={variables}
        view={view}
      />
    </React.Fragment>
  );
}

export default GlowingEllipse;
