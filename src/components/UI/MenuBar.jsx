import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button } from 'react-md';
import { MenuDrawer } from '../../components/UI/Drawers';

export default class MenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isMouseOvered: false
    };
  }

  render() {
    const {
      leftIconCallback,
      rightIconCallback,
    } = this.props;

    const isClassHidden = this.state.isMouseOvered ? 'visible' : 'hidden'

    return (
      <React.Fragment>
        <Toolbar
          colored
          className={"AppBarInner " + isClassHidden}
          nav={ <Button icon onClick={ leftIconCallback }>menu</Button> }
          actions={ <Button className="sync-icon" icon onClick={ rightIconCallback }>sync</Button> }
        >
          <div className="toolbarText">Econ Circles</div>
        </Toolbar>
        <MenuDrawer
          id="contributions-menu"
          position="left"
        />
      </React.Fragment>
    );
  }
}

MenuBar.propTypes = {
  leftIconCallback: PropTypes.func,
  rightIconCallback: PropTypes.func,
};
