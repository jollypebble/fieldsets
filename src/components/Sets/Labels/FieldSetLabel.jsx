import React from 'react';
/**
 * Note this uses the HTML fieldset element and not our react component.
 */

const FieldSetLabel = ({id, className, name, active, visible, variables, children}) => {
  // Lowercase view for className
  const view_lower = variables.view.toLowerCase();
  return (
    <fieldset>
      <legend
        id={`${id}-legend`}
        className={`view-legend view-${view_lower}-legend`}
      >
        {name}
      </legend>
      {children}
    </fieldset>
  );
}

export default FieldSetLabel;
