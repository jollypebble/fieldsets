import React, { useState } from 'react';

import { MenuBar } from 'components/Menus';
import { TabbedDrawer, MenuDrawer } from 'components/Drawers';
import { FieldGroup } from 'lib/fieldsets';

const DiagramNav = () => {
  const [isMenuOpen, updateMenu] = useState(false);

  const toggleDrawer = () => {
    updateMenu(!isMenuOpen);
    return isMenuOpen;
  }


  const renderSheet = (sheet) => {
    return (
      <FieldGroup
        id={sheet}
        type={sheet}
      />
    );
  }

  return (
    <React.Fragment>
      <MenuBar
        id="menu-bar"
        title='Econ Circles'
        menuIconCallback={ toggleDrawer }
      />
      <div id="tabs-wrapper">
        <TabbedDrawer
          position="right"
          icon="account_box"
          title="Account Info"
          renderContent={ () => renderSheet('AccountSheet') }
        />
        <TabbedDrawer
          position="right"
          icon="library_books"
          title="Balance Sheet"
          renderContent={ () => renderSheet('BalanceSheet') }
        />
        <TabbedDrawer
          position="right"
          icon="bubble_chart"
          title="Econ Circles"
          renderContent={ () => renderSheet('AccountSheet') }
        />
      </div>
      <div id="menu-wrapper">
        <MenuDrawer
          title={ '' }
          isVisible={ false }
          toggleDrawer={ toggleDrawer }
        />
      </div>
    </React.Fragment>
  );
}

export default DiagramNav;
