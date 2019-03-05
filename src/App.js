import React, { Component } from 'react';
import { withApollo } from "react-apollo";

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
      sheetLoaded: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div id="econcircleapp">
          <CircleDiagram
            width={1920}
            height={1080}
            zoom={30}
            startX={30.5}
            startY={46}
          />
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default withApollo(App);
