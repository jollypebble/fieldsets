import React from 'react';

// Custom Components
import { Status, Focus, Account, DataCache, Interface, Diagram } from 'components/Core';

// You can change this status bar to a component of your liking. By default we use a react-md Snackbar
import { StatusBar } from 'components/Dialogs/StatusBar';

// Grab the size of our viewport
import { useViewerDimensions } from 'components/Core/Hooks';

/**
 * The basic UI components and all visualization areas are added here
 */
const App = (props) => {
  const { height, width } = useViewerDimensions();

  /** Zoom of the main diagram */
  const diagramZoom = 2.5;
  /** Width of the main diagram */
  const diagramWidth = width * diagramZoom;
  const diagramHeight = height * diagramZoom;

  const startX = width/2;
  const startY = height/2;

  // The status bar is cosumed by the data cache so we need to ensure it is rendered.
  return (
    <Status>
      <StatusBar/>
      <DataCache>
        <Focus>
          <Diagram
            id="econcircle-app"
            type="CircleDiagram"
            name="Econ Circles"
            meta={{
              attributes: {
                width: diagramWidth,
                height: diagramHeight
              },
              center: {
                x: startX,
                y: startY
              },
              zoom: {
                scale: diagramZoom
              }
            }}
            defaultFocus={true}
          />
          <Interface
            id="econcircle-dashboard"
            type="Dashboard"
            name="Econ Circles"
          />
        </Focus>
      </DataCache>
    </Status>
  );
}

export default App;
