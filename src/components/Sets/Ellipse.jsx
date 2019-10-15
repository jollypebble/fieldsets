import React from 'react';
import SVGLabel from './Labels/SVGLabel';

const Ellipse = ({id, active, variables}) => {
  const defaults = {
    radiusX: 9,
    radiusY: 1.8,
    ratio: 1.1,
    strokeWidth: 1
  };

  let {ratio, radiusX, radiusY, textX, textY, strokeWidth} = {...defaults, ...variables.attributes};
  radiusX = (active) ? radiusX * ratio : radiusX;
  radiusY = (active) ? radiusY * ratio : radiusY;

  const visible = variables.visible;

  const {center, parent} = variables;
  const hasParent = (parent && parent !== '') ? true : false;

  const centerX = center.x;
  const centerY = center.y;

  textX = (textX) ? textX : centerX;
  textY = (textY) ? textY : centerY;

  /**
   * Circle Text is set to center.
   */
  variables.attributes.textX = textX;
  variables.attributes.textY = textY;

  return (
    <React.Fragment>
      <ellipse
        id={id}
        className="setview-ellipse"
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth}
        onClick={() => {return}}
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

export default Ellipse;
