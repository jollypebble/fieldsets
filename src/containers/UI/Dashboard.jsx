import React, { Component } from 'react';
import { MenuBar } from 'components/UI';
import { TabbedDrawer } from 'components/UI/Drawers';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            top="64px"
          />
          <TabbedDrawer
            menuItems={[]}
            icon='library_books'
            title="Balance Sheet"
            color=""
            top="144px"
          />
        </div>
      </React.Fragment>
    );
  }
}
