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

  componentDidMount() {
    window.addEventListener('mousemove', e => {
      if (e.clientY <= 64 && this.state.isMouseOvered !== true) {
      const target = e.target;
      if (!target || target.classList.contains('block-header-over') === false) this.setState({ isMouseOvered: true });
      return;
      }
      if (e.clientY > 64 && this.state.isMouseOvered === true) return this.setState({ isMouseOvered: false });
    })
  };

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
