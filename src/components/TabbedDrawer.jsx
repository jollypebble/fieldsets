import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

class TabbedDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.styles = {
      tab: {
        top: this.props.top,
        left: -50,
      },
      drawer: {
        overflow: 'visible',
        zIndex: 1300,
      }
    };
  }

  /**
   * This toggles the visibility of the drawer
   */
  handleToggle = () => {
    if (!this.state.open) {
      this.styles.drawer.zIndex = 1301;
      // Slide our tab over to account for shadow offset.
      this.styles.tab = {
        top: this.props.top,
        left: -40,
      };
    } else {
      this.styles.drawer.zIndex = 1300;
      // Slide our tab over to account for shadow offset.
      this.styles.tab = {
        top: this.props.top,
        left: -50,
      };
    }
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <Drawer
        width={ 600 }
        openSecondary
        open={ this.state.open }
        containerStyle={ this.styles.drawer }
        className={ this.props.title }
      >
        <AppBar
          title={ <span className="drawer-title">{this.props.title}</span> }
          onLeftIconButtonClick={ this.handleToggle }
          iconElementLeft={ <IconButton><NavigationClose /></IconButton> }
          iconElementRight={ <FlatButton label="Save" /> }
        />
        <div className="drawer-tab" style={ this.styles.tab }>
          <div className="drawer-tab__icon">
            <IconButton
              style={ { height: '80px', width: '28px', padding: '0px' } }
              onClick={ this.handleToggle }
            >
              {this.props.icon}
            </IconButton>
          </div>
        </div>
        {this.props.sheet}
      </Drawer>
    );
  }
}

TabbedDrawer.propTypes = {
  sheet: PropTypes.element.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  top: PropTypes.string,
};

export default TabbedDrawer;
