import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Divider } from '@material-ui/core';
import { GridOn } from '@material-ui/icons';

import SideBarModalData from './sideBarModalForm';
import MenuFilters from '../Common/FormFields/MenuFilters';

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let boxClass = 'expandSideBar';
    if (this.props.addClass) {
      boxClass = 'sideBar';
    }

    return (
      <div className={ boxClass }>
        <SideBarModalData />
        <Divider />
        <MenuFilters />
        <Divider />
        <List>
          <ListItem
            style={ { color: '#fff' } }
            primaryText="Google Data"
            leftIcon={ <GridOn color="#fff" /> }
          />
        </List>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  addClass: PropTypes.bool,
};
