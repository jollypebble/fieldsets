import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Toolbar,
  Drawer,
  Button,
  SelectField,
  Checkbox
} from 'react-md';

const MenuDrawer = ({ position, type, title, isVisible, saveCallback, toggleDrawer }) => {

  const defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    saveCallback: null,
    position: 'left'
  }

  const renderFilterItems = () => (
    <div className="filter-items block-header-over" id="filter-items">
      <Checkbox
        id="filter1"
        name="filter1"
        label="Tax Advantaged"
        value="taxadvantaged"
      />
    </div>
  );

  useEffect( () => {
    const putClass = el => {
      el.classList.add('block-header-over');
      const children = el.children;
      if (children && children.length > 0) {
        let i = 0, len = children.length;
        while (i < len) {
          putClass(children[i]);
          i++;
        }
      }
    }
    const drawer = document.getElementById('menu-drawer');
    putClass(drawer);
    }
  );

  const isLeft = position === 'left';
  const hasSave = saveCallback !== null;

  const closeBtn = <Button className={"block-header-over"} icon onClick={ toggleDrawer }>close</Button>;
  const saveBtn = hasSave ? <Button className={"block-header-over"} icon onClick={ saveCallback }>save</Button> : null;
  return (
    <Drawer
      id="menu-drawer"
      type={ type }
      visible={ isVisible }
      position={ position }
      onVisibilityChange={ toggleDrawer }
      header={ (
        <Toolbar
          nav={ isLeft ? saveBtn : closeBtn }
          actions={ isLeft ? closeBtn : saveBtn }
          className="md-divider-border md-divider-border--bottom block-header-over block-header-over"
        >
          {title}
        </Toolbar>
      ) }
    >
      {renderFilterItems()}
    </Drawer>
  );
}

MenuDrawer.propTypes = {
  position: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  saveCallback: PropTypes.func,
};

export default MenuDrawer
