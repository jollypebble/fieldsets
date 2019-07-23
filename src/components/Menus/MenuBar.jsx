import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, Toolbar, Button } from 'react-md';

/**
 * The Menu Bar is used at the top of the application.
 * It offers a left side icon for a menu dropdown or drawer as well as a right side icon for an action such as saving to a persistant data store.
 */
export default class MenuBar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    alwaysVisible: PropTypes.bool,
    menuIcon: PropTypes.string, // Defaults to menu
    actionIcon: PropTypes.string, // Defaults to save
    inprogressIcon: PropTypes.string, // Defaults to sync
    menuIconCallback: PropTypes.func,
    actionIconCallback: PropTypes.func,
    actionIconCallbackTimeout: PropTypes.number,// Defaults to 10 secons
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: ''
    };

    this.actionCallback = this.actionCallback.bind(this);
    this.awaitAction = this.awaitAction.bind(this);
  }

  componentDidUpdate() {
    // Since icon is the only state of this component, initialize the icon to the default action icon after a render. This removes the sync icon.
    const actionIcon = (this.props.actionIcon) ? this.props.actionIcon : 'save';
    if ( this.state.icon !== actionIcon ) {
      this.setState({ icon: actionIcon });
    }
  }

  actionCallback() {
    return new Promise(resolve => {
        setTimeout(
          () => {
            if ( typeof this.props.actionIconCallback === 'function' ) {
              this.props.actionIconCallback();
              resolve('Menubar Action Completed');
            }
          },
          10000
        );
    });
  }

  async awaitAction() {
    const progressIcon = (typeof this.props.inprogressIcon !== 'undefined') ? this.props.inprogressIcon : 'sync';
    this.setState({ icon: progressIcon });

    try {
      await this.actionCallback();
    } catch (error) {
      console.log('Menubar Action Error');
      console.log(error);
    }
  }

  render() {
    const {
      title,
      menuIconCallback,
    } = this.props;

    const progressIcon = (typeof this.props.inprogressIcon !== 'undefined') ? this.props.inprogressIcon : 'sync';
    const actionIcon = (typeof this.props.actionIcon !== 'undefined') ? this.props.actionIcon : 'save';
    const iconClass = ( actionIcon === this.state.icon) ? `fa fa-${actionIcon}`: `fa fa-${progressIcon} fa-spin`;
    const menuIcon = (this.props.menuIcon) ? this.props.menuIcon : 'menu';

    return (
      <React.Fragment>
        <Toolbar
          colored
          className="AppBarInner"
          nav={ <Button className="menubar-menu-button" icon onClick={ menuIconCallback }>{ menuIcon }</Button> }
          actions={ <Button className="menubar-action-button" icon onClick={ this.actionCallback }><FontIcon iconClassName={iconClass} /></Button> }
        >
          <span className="menubar-title">{title}</span>
        </Toolbar>
      </React.Fragment>
    );
  }
}
