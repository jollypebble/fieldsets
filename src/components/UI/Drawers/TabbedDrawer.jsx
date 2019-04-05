import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Drawer, Button } from 'react-md';

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
      saveCallback,
      renderContent
    } = this.props;

    const drawerid=`tabbed-drawer-menu--${icon}`
    const { visible } = this.state;
    const isLeft = position === 'left';
    const hasSave = saveCallback !== (null || undefined);

    const closeBtn = <Button className="closeBtn" icon onClick={this.closeDrawer}>close</Button>;
    const saveBtn = hasSave ? <Button icon onClick={saveCallback}>save</Button> : null;

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
              { this.props.icon} 
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
                nav={ isLeft ? saveBtn : closeBtn }
                actions={ isLeft ? closeBtn : saveBtn }
                className="md-divider-border md-divider-border--bottom tapHeader"
              >
                { title }
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
  saveCallback: PropTypes.func,
  renderContent: PropTypes.func,
  top: PropTypes.string
};
