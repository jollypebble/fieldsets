import React, { Component } from 'react';
import { withApollo } from "react-apollo";

// Custom Components
import { Dashboard } from 'containers/UI';
import { CircleDiagram } from 'containers/Diagrams/CircleDiagram';

// import { BalanceSheet, ClientSheet } from '/components/Sheets';

/**
 * The basic UI components and all visualization areas are added here
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 1920,
      height: 1080
    };
  }

  componentDidMount() {
    this.onResizeWindow();
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { width, height } = this.state;

    return (
      <React.Fragment>
        <div id="econcircleapp">
          <CircleDiagram
            width={ width }
            height={ height }
            zoom={ 32 }
            startX={ 30.5 }
            startY={ 46 }
          />
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default withApollo(App);
