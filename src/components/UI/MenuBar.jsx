import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button } from 'react-md';
import { MenuDrawer } from 'components/Drawers';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      leftIconCallback,
      rightIconCallback,
    } = this.props;

    return (
      <React.Fragment>
        <Toolbar
          colored
          className="AppBarInner"
          nav={<Button icon onClick={leftIconCallback}>menu</Button>}
          actions={<Button icon onClick={rightIconCallback}>sync</Button>}
        >
          <Button
            flat
            primary
            className="contributions"
          >
            Monthly Contribution: $28,0000
          </Button>
          <Button
            flat
            primary
            className="lumpsum"
          >
            Lump Sums: $28,0000
          </Button>
        </Toolbar>
        <MenuDrawer
          id='contributions-menu'
          position='left'
        />
      </React.Fragment>
    );
  }
}

MenuBar.propTypes = {
  leftIconCallback: PropTypes.func,
  rightIconCallback: PropTypes.func,
};