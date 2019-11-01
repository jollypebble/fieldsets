import React from 'react';
import { SetLabel, Sheet } from 'components/Core';

const Rectangle = ({id, view, active, variables}) => {
  const defaults = {
    width: 120,
    height: 36,
    ratio: 1,
    strokeWidth: 1
  };
  let {ratio, width, height, textX, textY, strokeWidth} = {...defaults, ...variables.attributes};
  const {center, visible} = variables;
  const centerX = center.x;
  const centerY = center.y;

  textX = (textX) ? textX : centerX;
  textY = (textY) ? textY : centerY;

  width = (active) ? width * ratio : width;
  height = (active) ? height * ratio : height;

  variables.attributes.textX = textX;
  variables.attributes.textY = textY;

  // Lowercase view for className
  const view_lower = view.toLowerCase();
  return (
    <React.Fragment>
      <rect
        id={id}
        className={`view view-${view_lower}`}
        x={centerX}
        y={centerY}
        width={width}
        height={height}
        strokeWidth={strokeWidth ? strokeWidth : 1}
      />
      <SetLabel
        id={`${id}-label`}
        type={'FieldSetLabel'}
        className={`view-label view-${view_lower}-label`}
        name={variables.name}
        active={active}
        visible={visible}
        variables={variables}
      >
        <Sheet
          id={id}
          type="LabelSheet"
          active={active}
          visible={visible}
          variables={variables}
        />
      </SetLabel>
    </React.Fragment>
  );
}

export default Rectangle;
