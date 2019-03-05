import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Drawer, Button } from 'react-md';

export default class MenuDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  static defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    saveCallback: null
  }

  openDrawer = () => {
    this.setState({ isVisible: true });
  };

  closeDrawer = () => {
    this.setState({ isVisible: false });
  };

  handleVisibility = (isVisible) => {
    this.setState({ isVisible });
  };

  render() {
    const {
      id,
      position,
      type,
      title,
      saveCallback
    } = this.props;

    const { isVisible } = this.state;
    const isLeft = position === 'left';
    const hasSave = saveCallback !== null;

    const closeBtn = <Button icon onClick={ this.closeDrawer }>close</Button>;
    const saveBtn = hasSave ? <Button icon onClick={ saveCallback }>save</Button> : null;
    return (
      <Drawer
        id={ id }
        type={ type }
        visible={ isVisible }
        position={ position }
        onVisibilityChange={ this.handleVisibility }
        openDrawer={ this.openDrawer }
        closeDrawer={ this.closeDrawer }
        handleVisibility={ this.handleVisibility }
        className="md-drawer-relative"
        header={ (
          <Toolbar
            nav={ isLeft ? saveBtn : closeBtn }
            actions={ isLeft ? closeBtn : saveBtn }
            className="md-divider-border md-divider-border--bottom"
          >
            {title}
          </Toolbar>
        ) }
      />
    );
  }
}

MenuDrawer.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  saveCallback: PropTypes.func,
};
