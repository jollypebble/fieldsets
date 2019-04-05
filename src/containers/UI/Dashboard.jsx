import React, { Component } from 'react';

import { MenuBar } from '../../components/UI';
import { TabbedDrawer, MenuDrawer } from '../../components/UI/Drawers';
import { BalanceSheet, ClientSheet } from '../../components/Sheets';

const clientSheetItems = [
  'accountName',
  'clientName1',
  'clientName2',
  'cpaName',
  'attyName',
  'ip'
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      isMDVisible: false
    };
  }

  toggleDrawer = () => {
    this.setState({ isMDVisible: !this.state.isMDVisible });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleClientSave = () => {
    if (!this._clientSheet.isValidForm()) return;
    const temp = {};
    clientSheetItems.forEach((item) => {
      temp[item] = this._clientSheet[item]._field.getValue();
    });
    temp.dependencies = this._clientSheet.state.dependencies;
    this.setState({ clients: this.state.clients.concat(temp) });
    this.initializeClientSheet();
  };

  initializeClientSheet = () => {
    clientSheetItems.forEach((item) => {
      this._clientSheet[item]._field._field.value = '';
    });
    this._clientSheet.setState({ dependencies: [] });
  };

  renderClientSheet = () => {
    return (
      <ClientSheet
        ref={ (item) => { this._clientSheet = item; } }
        clients={ this.state.clients }
        onChange={ this.handleChange }
      />
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
          leftIconCallback={ this.toggleDrawer }
        />
        <div id="tabs-wrapper">
          <TabbedDrawer
            position="right"
            icon="account_box"
            title="Client"
            renderContent={ () => this.renderClientSheet() }
            saveCallback={ this.handleClientSave }
          />
          <TabbedDrawer
            position="right"
            icon="library_books"
            title="Balance"
            renderContent={ this.renderBalanceSheet }
          />
        </div>
        <div id="menu-wrapper">
          <MenuDrawer
            title={ 'My Awesome Drawer' }
            isVisible={ this.state.isMDVisible }
            toggleDrawer={ this.toggleDrawer }
          />
        </div>
      </React.Fragment>
    );
  }
}
