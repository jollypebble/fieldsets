import React from 'react';

// If you want custom control over the default data values, use the DataLayer & InitLayer components instead of FieldSetsApp
import { FieldSetsApp, Interface, Diagram, Sheet } from 'lib/fieldsets';

// Grab the size of our viewport
import { useViewerDimensions } from 'lib/fieldsets/Hooks';

/**
 * The basic UI components and all visualization areas are added here
 */
const App = (props) => {
  const { height, width } = useViewerDimensions();
  const startX = width/2;
  const startY = height/2;

  return (
    <FieldSetsApp>
      <Interface
        id="econcircle-interface-controller"
        portal="controller"
        type="MainNav"
        name="CPAF Data Visualization"
        visible={true}
      >
        <Interface
          id="econcircle-dashboard"
          type="DiagramNav"
          name="Econ Circles"
          visible={true}
        >
          <Diagram
            id="econcircle-app"
            view="CircleDiagram"
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
            visible={true}
          />
        </Interface>
        <Sheet
          id="econcircle-balancesheet"
          view="BalanceSheet"
          name="Balance Sheet"
          meta={{
            attributes: {
              width: width,
              height: height
            }
          }}
          visible={false}
        />
      </Interface>
    </FieldSetsApp>
  );
}

export default App;
