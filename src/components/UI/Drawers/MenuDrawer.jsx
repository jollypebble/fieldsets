import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Toolbar,
  Drawer,
  Button,
  SelectField,
  Checkbox
} from 'react-md';

const filterItems1 = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export default class MenuDrawer extends PureComponent {

  static defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    saveCallback: null,
    position: 'left'
  }

  toggleDrawer = () => {
    this.props.toggleDrawer();
  };

  renderFilterItems = () => (
    <div className="filter-items block-header-over" id="filter-items">
      <SelectField
        id="select-filter"
        placeholder="Filter 1"
        menuItems={ filterItems1 }
        position={ SelectField.Positions.BELOW }
      />
      <SelectField
        id="select-filter"
        placeholder="Filter 2"
        menuItems={ filterItems1 }
        position={ SelectField.Positions.BELOW }
      />
      <Checkbox
        id="checkbox1"
        name="checkbox1"
        label="CheckBox 1"
        value="checkbox1"
      />
      <Checkbox
        id="checkbox2"
        name="checkbox2"
        label="CheckBox 2"
        value="checkbox2"
      />
    </div>
  );

  componentDidUpdate() {
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

  render() {
    const {
      position,
      type,
      title,
      isVisible,
      saveCallback
    } = this.props;

    const isLeft = position === 'left';
    const hasSave = saveCallback !== null;

    const closeBtn = <Button className={"block-header-over"} icon onClick={ this.toggleDrawer }>close</Button>;
    const saveBtn = hasSave ? <Button className={"block-header-over"} icon onClick={ saveCallback }>save</Button> : null;
    return (
      <Drawer
        id="menu-drawer"
        type={ type }
        visible={ isVisible }
        position={ position }
        onVisibilityChange={ this.toggleDrawer }
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
        {this.renderFilterItems()}
      </Drawer>
    );
  }
}

MenuDrawer.propTypes = {
  position: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  saveCallback: PropTypes.func,
};
