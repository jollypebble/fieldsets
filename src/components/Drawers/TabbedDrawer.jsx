import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Drawer, Button, FontIcon } from 'react-md';

export default class TabbedDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.openposition = '-130px';
    this.closedposition = '-40px';
    this.state = {
      visible: false,
      tabposition: this.closedposition
    };
  }

  static defaultProps = {
    type: Drawer.DrawerTypes.TEMPORARY,
    position: 'right'
  }

  openDrawer = () => {
    this.setState({ visible: true, tabposition: this.openposition });
  };

  closeDrawer = () => {
    this.setState({ visible: false, tabposition: this.closedposition });
  };

  toggleDrawer = () => {
    if ( this.state.visible ) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const {
      icon,
      position,
      type,
      title,
      renderContent
    } = this.props;

    const drawerid=`tabbed-drawer-menu--${icon}`
    const { visible } = this.state;

    const closeBtn = <Button className="closeBtn" icon onClick={this.closeDrawer}>arrow_forward</Button>;
    const tabBtn = <Button icon>{icon}</Button>;

    return (
      <React.Fragment>
        <div
          className="drawer-tab"
          style={ { top: this.props.top, left: this.state.tabposition } }
        >
          <div className="drawer-tab__icon">
            <Button
              icon
              onClick={ this.toggleDrawer }
            >
              { icon }
            </Button>
          </div>
          <Drawer
            id={ drawerid }
            className="tabbed-drawer"
            type={ type }
            visible={ visible }
            position={ position }
            onVisibilityChange={ this.handleVisibility }
            overlay={ false }
            style={ { top: '64px', width: '40%' } }
            header={ (
              <Toolbar
                colored
                nav={ tabBtn }
                actions={ closeBtn }
                className="md-divider-border md-divider-border--bottom tapHeader"
              >
                <span>{ title }</span>
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
  renderContent: PropTypes.func,
  top: PropTypes.string
};
