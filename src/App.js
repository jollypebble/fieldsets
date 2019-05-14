import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

// Custom Components
import { Dashboard } from './containers/UI'
import { CircleDiagram } from './containers/Diagrams/CircleDiagram';

import DiagramEvents from './utils/DiagramEvents'

/**
 * The basic UI components and all visualization areas are added here
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      open: false,
      totalcontributionsAmount: 500000,
      dataSource: [],
      sheetLoaded: false,
    };
  }

  componentDidMount() {
    DiagramEvents.init()
  }

  render() {
    /** Zoom of the main diagram */
    let diagramZoom = 1;
    // let diagramZoom = 30;
    /** Width of the main diagram */
    let diagramWidth = 1920;
    /** The screen width. We need it for setting startX in the middle of the screen */
    let screenWidth = window.innerWidth ? window.innerWidth : 750; // 750 is fallback

    return (
      <React.Fragment>
        <div id="econcircleapp">
          <CircleDiagram
            width={diagramWidth}
            height={1080}
            zoom={diagramZoom}
            startX={300 + (diagramWidth - screenWidth) / diagramZoom * 0.5} // here we calculate the point which means the center of the screen (the first "magic number" is unknown shift which puts "0" of diagram to "0" of the screen)
            startY={260}
          />
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default withApollo(App);
