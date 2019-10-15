import React from 'react';
import SVGLabel from './Labels/SVGLabel';

const Rectangle = ({id, active, variables}) => {
  const defaults = {
    width: 120,
    height: 36,
    rotate: 0,
    ratio: 1,
    strokeWidth: 1
  };

  const {width, height, rotate, ratio, strokeWidth} = {...defaults, ...variables.attributes};
  let {radiusX, radiusY, textX, textY} = variables.attributes;
  const {center, parent} = variables;
  let visible = variables.visible;

  const hasParent = (parent && parent !== '') ? true : false;
  let centerX = center.x;
  let centerY = center.y;

  /**
   * Rectangle Text does not align without delaring center text.
   */
  textX = (textX) ? textX : centerX + (width/2);
  textY = (textY) ? textY : centerY + (height/2);
  variables.attributes.textX = textX;
  variables.attributes.textY = textY;

  return (
    <React.Fragment>
      <rect
        id={id}
        className="setview rectangle-setview rectangle"
        x={centerX}
        y={centerY}
        width={width}
        height={height}
        transform={`rotate(${rotate ? rotate : 0})`}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth ? strokeWidth : 1}
      />
      <SVGLabel
        id={`${id}-label`}
        className="setview-label setview-circle-label"
        name={variables.name}
        active={active}
        visible={visible}
        variables={variables}
      />
    </React.Fragment>
  );
}

export default Rectangle;
