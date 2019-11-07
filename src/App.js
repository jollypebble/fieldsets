import React from 'react';

// Custom Components
import { FieldSetsApp, Interface, Diagram } from 'components/Core';

// Grab the size of our viewport
import { useViewerDimensions } from 'components/Core/Hooks';

/**
 * The basic UI components and all visualization areas are added here
 */
const App = (props) => {
  const { height, width } = useViewerDimensions();
  const startX = width/2;
  const startY = height/2;

  // The status bar is cosumed by the data cache so we need to ensure it is rendered.
  return (
    <FieldSetsApp>
      <Diagram
        id="econcircle-app"
        type="CircleDiagram"
        name="Econ Circles"
        meta={{
          attributes: {
            width: width,
            height: height
          },
          center: {
            x: startX,
            y: startY
          }
        }}
        defaultFocus={true}
      />
      <Interface
        id="econcircle-dashboard"
        type="Dashboard"
        name="Econ Circles"
      />
    </FieldSetsApp>
  );
}

export default App;
