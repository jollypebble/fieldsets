import React, { Component } from 'react';
import { MenuBar } from 'components/UI';
import { TabbedDrawer } from 'components/UI/Drawers';
import { BalanceSheet } from 'components/Sheets';
import { ClientSheet } from 'components/Sheets';

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
      clients: []
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleClientSave = () => {
    if (!this._clientSheet.isValidForm()) return;
    let temp = {};
    clientSheetItems.forEach(item => {
      temp[item] = this._clientSheet[item]._field.getValue()
    });
    temp.dependencies = this._clientSheet.state.dependencies;
    this.setState({ clients: this.state.clients.concat(temp) });
    this.initializeClientSheet();
  };

  initializeClientSheet = () => {
    clientSheetItems.forEach(item => {
      this._clientSheet[item]._field._field.value = '';
    });
    this._clientSheet.setState({ dependencies: [] });
  };

  renderClientSheet = () => {
    return (
      <ClientSheet
        ref={ item => { this._clientSheet = item } }
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
          leftIconCallback={this.openDrawer}
        />
        <div id="tabs-wrapper">
          <TabbedDrawer
            menuItems={[]}
            position ='right'
            icon='account_box'
            title="Client"
            renderContent={ this.renderClientSheet }
            saveCallback={ this.handleClientSave }
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
