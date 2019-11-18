import React from 'react';
/**
 * Note this uses the HTML fieldset element and not a react component.
 */

const FieldsetLabel = ({id, className, name, active, visible, variables, children}) => {
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

export default FieldsetLabel;
