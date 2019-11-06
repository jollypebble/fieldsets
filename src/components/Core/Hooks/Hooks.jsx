import React, { useState, useEffect } from 'react';
import { Functions } from 'components/Core/Field/callbacks/Functions';
/**
 * This is our hook component which sets up the required contexts for our core hooks.
 */
const Hooks = (props) => {
  return (
    <Functions>
      {props.children}
    </Functions>
  );
};

export default Hooks;
