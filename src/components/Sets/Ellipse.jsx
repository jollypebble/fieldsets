import React from 'react';
import { SetLabel, FieldGroup } from 'lib/fieldsets';

const Ellipse = ({id, view, active, variables}) => {
  const defaults = {
    radiusX: 75,
    radiusY: 15,
    ratio: 1,
    strokeWidth: 1
  };

  let {ratio, radiusX, radiusY, textX, textY, strokeWidth} = {...defaults, ...variables.attributes};
  radiusX = (active) ? radiusX * ratio : radiusX;
  radiusY = (active) ? radiusY * ratio : radiusY;

  const {center, visible} = variables;
  const centerX = center.x;
  const centerY = center.y;

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
      <ellipse
        id={id}
        className={`view view-${view_lower}`}
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        strokeWidth={strokeWidth}
      />
      <SetLabel
        id={`${id}`}
        type='FieldsetLabel'
        className={`view-label view-${view_lower}-label`}
        name={variables.name}
        active={active}
        visible={visible}
        variables={variables}
      >
        <FieldGroup
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

export default Ellipse;
