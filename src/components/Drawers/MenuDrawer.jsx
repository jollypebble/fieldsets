import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Drawer, Button } from 'react-md';
import { Row, Col } from 'react-flexbox-grid';

export default class MenuDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  static defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    saveCallback: null,
    position: 'left'
  }

  openDrawer = () => {
    this.setState({ visible: true });
  };

  closeDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const {
      id,
      position,
      type,
      title,
      saveCallback
    } = this.props;

    const { visible } = this.state;
    const isLeft = position === 'left';
    const hasSave = saveCallback !== null;

    const closeBtn = <Button icon onClick={this.closeDrawer}>close</Button>;
    const saveBtn = hasSave ? <Button icon onClick={saveCallback}>save</Button> : null;
    return (
      <Drawer
        id={id}
        type={type}
        visible={visible}
        position={position}
        onVisibilityChange={this.handleVisibility}
        openDrawer={this.openDrawer}
        closeDrawer={this.closeDrawer}
        handleVisibility={this.handleVisibility}
        className='md-drawer-relative'
        header={(
          <Toolbar
            nav={isLeft ? saveBtn : closeBtn}
            actions={isLeft ? closeBtn : saveBtn}
            className="md-divider-border md-divider-border--bottom"
          >
            {title}
          </Toolbar>
        )}
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
