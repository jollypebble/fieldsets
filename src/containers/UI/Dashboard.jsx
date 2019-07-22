import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import { MenuBar } from 'components/Menus';
import { TabbedDrawer, MenuDrawer } from 'components/Drawers';
import { BalanceSheet, ClientSheet } from 'components/Sheets';

import { getClientList } from '../../graphql';

const clientSheetItems = [
  'accountName',
  'clientName1',
  'clientName2',
  'cpaName',
  'attyName',
  'ipAddress'
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      isMDVisible: false
    };
  }

  componentDidMount() {
    const allClients = this.getClientList();

    this.setState({
      clients: (allClients && allClients.list) || []
    });
  }

  getClientList = () => {
    const id = 'ClientList:normal';

    const clientList = this.props.client.readFragment({
      id,
      fragment: getClientList,
      fragmentName: 'clients'
    });

    return clientList;
  }

  toggleDrawer = () => {
    this.setState({ isMDVisible: !this.state.isMDVisible });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleClientSave = () => {
    const temp = {};
    clientSheetItems.forEach((item) => {
      temp[item] = this._clientSheet[item]._field.getValue();
    });
    this.setClientCache([{ ...temp, id: Date.now() }]);
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

  setClientCache = (data = []) => {
    if (!data.length) return false;

    data.forEach(currentClient => {
      currentClient.__typename = 'Client';

      let clientList = this.getClientList();

      // Cache hasn't been written yet, so set it using default.
      clientList = clientList || { id: 'normal', list: [], __typename: 'ClientList' };
      clientList.list = clientList.list.filter(item => item.id !== currentClient.id);
      clientList.list.push(currentClient);

      const id = 'ClientList:normal';

      this.props.client.writeFragment({
        id,
        fragment: getClientList,
        fragmentName: 'clients',
        data: clientList
      });
    });
  }

  renderClientSheet = () => {
    return (
      <ClientSheet
        ref={ (item) => { this._clientSheet = item; } }
        clients={ this.state.clients }
        onChange={ this.handleChange }
        onSave={ this.handleClientSave }
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
            title={ '' }
            isVisible={ this.state.isMDVisible }
            toggleDrawer={ this.toggleDrawer }
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withApollo(Dashboard);
