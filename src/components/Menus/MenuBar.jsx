import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, Toolbar, Button } from 'react-md';

/**
 * The Menu Bar is used at the top of the application.
 * It offers a left side icon for a menu dropdown or drawer as well as a right side icon for an action such as saving to a persistant data store.
 */
const MenuBar = ({ title, alwaysVisible, menuIcon, actionIcon, inprogressIcon, menuIconCallback, actionIconCallback, actionIconCallbackTimeout }) => {
  const [icon, updateIcon] = useState('');

  const progressIcon = (typeof inprogressIcon !== 'undefined') ? inprogressIcon : 'sync';
  actionIcon = (typeof actionIcon !== 'undefined') ? actionIcon : 'save';
  const iconClass = ( actionIcon === icon) ? `fa fa-${actionIcon}`: `fa fa-${progressIcon} fa-spin`;
  menuIcon = (menuIcon) ? menuIcon : 'menu';



  useLayoutEffect( () => {
      // Since icon is the only state of this component, initialize the icon to the default action icon after a render. This removes the sync icon.
      const actionIcon = (actionIcon) ? actionIcon : 'save';
      if ( icon !== actionIcon ) {
        updateIcon( actionIcon );
      }
    },
    [icon]
  );

  const actionCallback = () => {
    return new Promise(resolve => {
        setTimeout(
          () => {
            if ( typeof actionIconCallback === 'function' ) {
              actionIconCallback();
              resolve('Menubar Action Completed');
            }
          },
          10000
        );
    });
  }

  const awaitAction = async () => {
    const progressIcon = (inprogressIcon !== 'undefined') ? inprogressIcon : 'sync';
    updateIcon(progressIcon);

    try {
      await actionCallback();
    } catch (error) {
      console.log('Menubar Action Error');
      console.log(error);
    }
  }

    return (
      <React.Fragment>
        <Toolbar
          colored
          className="AppBarInner"
          nav={ <Button className="menubar-menu-button" icon onClick={ menuIconCallback }>{ menuIcon }</Button> }
          actions={ <Button className="menubar-action-button" icon onClick={ actionCallback }><FontIcon iconClassName={ iconClass } /></Button> }
        >
          <span className="menubar-title">{title}</span>
        </Toolbar>
      </React.Fragment>
    );
}

MenuBar.propTypes = {
  title: PropTypes.string,
  alwaysVisible: PropTypes.bool,
  menuIcon: PropTypes.string, // Defaults to menu
  actionIcon: PropTypes.string, // Defaults to save
  inprogressIcon: PropTypes.string, // Defaults to sync
  menuIconCallback: PropTypes.func,
  actionIconCallback: PropTypes.func,
  actionIconCallbackTimeout: PropTypes.number,// Defaults to 10 secons
};
export default MenuBar;
