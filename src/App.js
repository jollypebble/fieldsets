import React from 'react';

// If you want custom control over the default data values, use the DataLayer & InitLayer components instead of FieldSetsApp
import { FieldSetsApp, Interface, Diagram } from 'lib/fieldsets';

// Grab the size of our viewport
import { useViewerDimensions } from 'lib/fieldsets/Hooks';

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
      <Interface
        id="econcircle-interface-controller"
        type="MainNav"
        name="CPAF Data Visualization"
      >
        <Interface
          id="econcircle-dashboard"
          type="DiagramNav"
          name="Econ Circles"
        >
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
        </Interface>
      </Interface>
    </FieldSetsApp>
  );
}

export default App;
