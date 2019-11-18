import React from 'react';
import { SetLabel } from 'lib/fieldsets';

const Label = ({id, view, active, variables, children}) => {
  return (
    <SetLabel
      id={id}
      name={variables.name}
      view={view}
      className={variables.className}
      visible={variables.visible}
      active={active}
      variables={variables}
    >
      {children}
    </SetLabel>
  );
}

export default Label;
