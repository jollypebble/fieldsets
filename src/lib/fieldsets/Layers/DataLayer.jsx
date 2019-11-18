import React from 'react';
import { Hooks, DataCache } from 'lib/fieldsets';
/**
 * A FieldSets Web Application, whcih should be nested within the FieldSetsInit component.
 * This is a wrapper component that sets data cache and the correct component ordering for prop drilling.
 */
const FieldSetsApp = (props) => {
  return (
    <DataCache>
      <Hooks>
        {props.children}
      </Hooks>
    </DataCache>
  );
};

export default FieldSetsApp;
