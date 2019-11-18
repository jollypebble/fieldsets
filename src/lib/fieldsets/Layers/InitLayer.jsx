import React from 'react';
import { Defaults, Status, Portals } from 'lib/fieldsets/Hooks/Handlers';
/**
 * Initialize a FieldSets Application and allow for customization of initialization.
 */
const InitLayer = (props) => {
  /**
   * While Defaults and status are hooks, they don't require access to the datacache.
   * Since they are used for initialization of the application, we call them outside of the hooks component and put them in their own component.
   */
  return (
    <Status
      stage='application'
      status='default'
      message='Initializing FieldSets Application'
    >
      <Defaults>
        <Portals>
          {props.children}
        </Portals>
      </Defaults>
    </Status>

  );
};

export default InitLayer;
