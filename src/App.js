import React from 'react';

// Custom Components
import { Account, DataCache, Interface, Diagram } from 'components/Core';

/**
 * The basic UI components and all visualization areas are added here
 */
const App = (props) => {
  /** Zoom of the main diagram */
  const diagramZoom = 2.5;
  /** Width of the main diagram */
  const diagramWidth = 1920;
  /** The screen width. We need it for setting startX in the middle of the screen */
  const screenWidth = window.innerWidth ? window.innerWidth : 750; // 750 is fallback

  const startX = 880 + (diagramWidth - screenWidth) / diagramZoom * 0.5;

  return (
    <DataCache>
      <Diagram
        id="econcircle-app"
        type="CircleDiagram"
        name="Econ Circles"
        meta={{
          attributes: {
            width: diagramWidth,
            height: 1080
          },
          center: {
            x: startX,
            y: 490
          },
          zoom: {
            scale: diagramZoom
          }
        }}
        isFocused={true}
      />
      <Interface
        id="econcircle-dashboard"
        type="Dashboard"
        name="Econ Circles"
      />
    </DataCache>
  );
}

export default App;
