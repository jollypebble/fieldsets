import React, { Component } from 'react';
import { MenuBar } from 'components/UI';
import { TabbedDrawer } from 'components/UI/Drawers';
import { BalanceSheet } from 'config/data/Sheets';
import { ClientSheet } from 'config/data/Sheets';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderClientSheet = () => {
    return (
      <ClientSheet />
    );
  }

  renderBalanceSheet = () => {
    return (
      <BalanceSheet />
    );
  }

  render() {
    return (
      <React.Fragment>
        <MenuBar
          leftIconCallback={ this.openDrawer }
        />
        <div id="tabs-wrapper">
          <TabbedDrawer
            menuItems={ [] }
            position="right"
            icon="account_box"
            title="Client"
            renderContent={ this.renderClientSheet }
          />
          <TabbedDrawer
            menuItems={ [] }
            position="right"
            icon="library_books"
            title="Balance Sheet"
            renderContent={ this.renderBalanceSheet }
          />
        </div>
      </React.Fragment>
    );
  }
}
