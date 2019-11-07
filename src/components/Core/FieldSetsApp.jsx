import React from 'react';
// Custom Components
import { Status, Focus, Hooks, DataCache } from 'components/Core';
/**
 * A wrapper component that sets the correct component ordering for prop drilling.
 */
const FieldSetsApp = (props) => {
  return (
    <Status>
      <DataCache>
        <Focus>
          <Hooks>
            {props.children}
          </Hooks>
        </Focus>
      </DataCache>
    </Status>
  );
};

export default FieldSetsApp;
