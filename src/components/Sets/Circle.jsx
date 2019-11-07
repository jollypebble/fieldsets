import React, { useRef, useEffect } from 'react';
import { SetLabel, FieldSet } from 'components/Core';

const Circle = ({id, view, active, variables}) => {
  const defaults = {
    radius: 28,
    ratio: 1.1,
    strokeWidth: 1
  };

  let {ratio, radius, textX, textY, strokeWidth} = {...defaults, ...variables.attributes};
  const {center, visible} = variables;
  const centerX = center.x;
  const centerY = center.y;

  radius = (active) ? radius * ratio : radius;

  textX = (textX) ? textX : centerX;
  textY = (textY) ? textY : centerY;

  /**
   * Circle Text is set to center.
   */
  variables.attributes.textX = textX;
  variables.attributes.textY = textY;

  // Lowercase view for className
  const view_lower = view.toLowerCase();
  return (
    <React.Fragment>
      <circle
        id={`${id}-view`}
        className={`view view-${view_lower}`}
        cx={centerX}
        cy={centerY}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <SetLabel
        id={`${id}-label`}
        type='FieldSetLabel'
        className={`view-label view-${view_lower}-label`}
        name={variables.name}
        active={active}
        visible={visible}
        variables={variables}
      >
        <FieldSet
          id={id}
          type='LabelSheet'
          active={active}
          visible={visible}
          variables={variables}
        />
      </SetLabel>
    </React.Fragment>
  );
}

export default Circle;
