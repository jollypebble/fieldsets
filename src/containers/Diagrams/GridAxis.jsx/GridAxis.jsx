import React from 'react';
import {useViewerDimensions} from 'lib/fieldsets/Hooks';

/**
 * This is the container for our main diagram. It has direct access to the apollo cache so it can track foucs of it's child sets.
 */
const GridAxis =  ({ id, name, type, meta: metaInit, data = [] } ) => {
  const { height, width } = useViewerDimensions();
  return (
    <svg height="400" viewBox="0 0 400 400" width="400">
       <defs>
          <pattern id="grid20" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
          </pattern>
       </defs>
       <rect fill="white" height="1000" width="1000" y="-300" x="-300"></rect>
       <rect fill="url(#grid20)" height="1000" width="1000" y="-300" x="-300"></rect>
    </svg>
  );
}
export default GridAxis;
