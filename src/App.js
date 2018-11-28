import React, { Component } from 'react';
import ReactGoogleSheetConnector from 'react-google-sheet-connector';
import { TreeDiagram } from './containers';

import { Auth } from './config';

// Styles
import CssBaseline from '@material-ui/core/CssBaseline';

// Core MUI Components
import { Button, IconButton, Dialog, AppBar, TextField } from '@material-ui/core';
// Our icons
import { AccountBox, LibraryBooks, PeopleOutline } from '@material-ui/icons';

import { Row, Col } from 'react-flexbox-grid';

// Custom Components
import TabbedDrawer from './components/TabbedDrawer';
import { BalanceSheet, ClientSheet } from './components/Sheets';

// sideBar
import MenuDrawer from './components/MenuDrawer';

// Styles
const styles = {
  container: {
    textAlign: 'center',
    overflow: 'visible',
  },
  marginLeft: 20,
  title: {
    cursor: 'pointer',
  },
  appbar: {
    zIndex: 1500
  }
};

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

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  expandSideBar = () => {
    this.setState({ addClass: !this.state.addClass });
  }

  toggleVisibility = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const actions = [
      <Button
        label="Cancel"
        primary
        onClick={ this.toggleVisibility }
        key="sidbarDrawerCancelButton"
      />,
      <Button
        label="Submit"
        primary
        keyboardFocused
        onClick={ this.toggleVisibility }
        key="sidbarDrawerSubmitButton"
      />,
    ];

    let boxClass = 'expandSideBarRef';
    if (this.state.addClass) {
      boxClass = 'sideBarRef';
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          title="EconCircles"
          onLeftIconButtonClick={ () => this.expandSideBar() }
          // TODO: Add in text Econ Circles for menu
          // TODO: Add A left Menu that allows you to toggle filters.
          // TODO: Add client dropdown on right side which pulls last names from Google drive folder listings and populates the client sheet upon selection.
          // TODO: Add search user
          iconStyleLeft={ styles.appbar }
          iconElementRight={
            <div>
              <IconButton><PeopleOutline /></IconButton>
            </div>
          }
        >
          <div className="AppBarInner">
            <Button
              className="contributions"
              onClick={ () => this.toggleVisibility() }
              label="Monthly Contribution: $28,0000"
            />
            <Button
              className="contributions"
              onClick={ () => this.toggleVisibility() }
              label="Lump Sums: $28,0000"
            />
          </div>
          <Dialog
            title="Scrollable Dialog"
            actions={ actions }
            modal={ false }
            open={ this.state.open }
            onRequestClose={ this.handleClose }
            autoScrollBodyContent
          >
            <div>
              <form>
                <Row middle="xs">
                  <Col xs={ 12 }>
                    <TextField
                      type="number"
                      name="Monthly Contribution"
                      label="Monthly Contribution"
                      // component={Input}
                      onChange={ this.handleValueChange }
                      value={ this.state.totalcontributionsAmount }
                    />
                    <TextField
                      type="number"
                      name="Lump Sums"
                      label="Lump Sums"
                      // component={Input}
                      onChange={ this.handleValueChange }
                      value={ this.state.totalcontributionsAmount }
                    />
                  </Col>
                </Row>
              </form>
            </div>
          </Dialog>
        </AppBar>
        <div>
          <MenuDrawer addClass={ this.state.addClass } />
        </div>
        <div id="econcircleapp" className={ boxClass }>
          <ReactGoogleSheetConnector
            clientid={ Auth.google.web.client_id }
            spreadsheetId="122UAWRcQD-R7sNHg60BijK8KKvKFAxqZ46v-ZxzKgqc"
            spinner={ <div className="loading-spinner" /> }
          >
            <div>
              This content will be rendered once the data has been fetched from the spreadsheet.
            </div>
          </ReactGoogleSheetConnector>
          <TreeDiagram />
          <div style={ styles.container }>
            <TabbedDrawer
              sheet={ <ClientSheet /> }
              icon={ <AccountBox /> }
              title="Client"
              color=""
              top="64px"
              open={ false }
            />
            <TabbedDrawer
              sheet={ <BalanceSheet /> }
              icon={ <LibraryBooks /> }
              title="BalanceSheet"
              color=""
              top="144px"
              open={ false }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
