import React, { useState } from 'react';

import { ViewBar } from 'components/Menus';

const MainNav = () => {

  return (
    <React.Fragment>
      <ViewBar
        id="view-bar"
        title='Change View'
      />
    </React.Fragment>
  );
}

export default MainNav;
