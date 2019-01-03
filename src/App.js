import React, { Component } from 'react';
import ReactGoogleSheetConnector from 'react-google-sheet-connector';

import { Auth } from 'config';

// Custom Components
import { Dashboard } from 'containers/UI'
import { CircleDiagram } from 'containers/Diagrams/CircleDiagram';

// import { BalanceSheet, ClientSheet } from '/components/Sheets';

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
    };
  }

  render() {
    return (
      <React.Fragment>
        <div id="econcircleapp">
          <CircleDiagram />
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default App;
