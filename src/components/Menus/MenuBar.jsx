import React, { useLayoutEffect, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, Toolbar, Button } from 'react-md';

/**
 * The Menu Bar is used at the top of the application.
 * It offers a left side icon for a menu dropdown or drawer as well as a right side icon for an action such as saving to a persistant data store.
 */
const MenuBar = ({ id, title, alwaysVisible, menuIcon, actionIcon, inprogressIcon, menuIconCallback, actionIconCallback, actionIconCallbackTimeout }) => {
  const propTypes = {
    title: PropTypes.string,
    alwaysVisible: PropTypes.bool,
    menuIcon: PropTypes.string, // Defaults to menu
    actionIcon: PropTypes.string, // Defaults to save
    inprogressIcon: PropTypes.string, // Defaults to sync
    menuIconCallback: PropTypes.func,
    actionIconCallback: PropTypes.func,
    actionIconCallbackTimeout: PropTypes.number,// Defaults to 10 secons
  };

  const [icon, updateIcon] = useState('');
  const [visible, updateVisible] = useState(false) ;
  const [classname, updateClassname] = useState('AppBarInner')
  const menuBarRef = useRef(null);

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
      console.error(error.message);
    }
  }

  const toggleVisible = () => {
    if ( visible ) {
      updateVisible(false);
    } else {
      updateVisible(true);
    }
  };


  useEffect(
    () => {
      if (visible) {
        updateClassname('AppBarInner visible');
      } else {
        updateClassname('AppBarInner hidden');
      }
    },
    [visible]
  );

  return (
    <div
      id={`${id}-wrapper`}
      onMouseOver={toggleVisible}
      onMouseOut={toggleVisible}
    >
      <Toolbar
        id={id}
        colored={true}
        className={classname}
        nav={ <Button className="menubar-menu-button" icon onClick={ menuIconCallback }>{ menuIcon }</Button> }
        actions={ <Button className="menubar-action-button" icon onClick={ actionCallback }><FontIcon iconClassName={ iconClass } /></Button> }
        ref={menuBarRef}
      >
        <span className="menubar-title">{title}</span>
      </Toolbar>
    </div>
  );
}

export default MenuBar;
