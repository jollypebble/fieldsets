import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Drawer, Button } from 'react-md';

export default class TabbedDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      tabposition: this.closedposition
    };
  }

  static defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    saveCallback: false,
    position: 'right'
  }

  toggleDrawer = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  handleVisibility = (isVisible) => {
    this.setState({ isVisible });
  };

  render() {
    const {
      icon,
      position,
      type,
      title,
      saveCallback,
      renderContent
    } = this.props;

    const drawerid = `tabbed-drawer-menu--${icon}`;
    const { isVisible } = this.state;
    const isLeft = position === 'left';
    const hasSave = saveCallback !== null;

    const closeBtn = <Button icon onClick={ this.toggleDrawer }>close</Button>;
    const saveBtn = hasSave ? <Button icon onClick={ saveCallback }>save</Button> : null;

    return (
      <React.Fragment>
        <div
          className="drawer-tab"
        >
          <div className="drawer-tab__icon">
            <Button
              icon
              onClick={ this.toggleDrawer }
            >
              {this.props.icon}
            </Button>
          </div>
          <Drawer
            id={ drawerid }
            className="tabbed-drawer"
            type={ type }
            visible={ isVisible }
            position={ position }
            onVisibilityChange={ this.handleVisibility }
            openDrawer={ this.toggleDrawer }
            closeDrawer={ this.toggleDrawer }
            handleVisibility={ this.handleVisibility }
            style={ { top: '64px', width: '40%' } }
            header={ (
              <Toolbar
                colored
                nav={ isLeft ? saveBtn : closeBtn }
                actions={ isLeft ? closeBtn : saveBtn }
                className="md-divider-border md-divider-border--bottom tapHeader"
              >
                {title}
              </Toolbar>
            ) }
          >
            { renderContent() }
          </Drawer>
        </div>
      </React.Fragment>
    );
  }
}

TabbedDrawer.propTypes = {
  icon: PropTypes.string.isRequired,
  position: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  saveCallback: PropTypes.bool,
  renderContent: PropTypes.func
};
