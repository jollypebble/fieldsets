import React from 'react';
import { Controller } from 'lib/fieldsets';

/**
 * This layer manages container visualization and interactions with it.
 */
const VisualLayer = (props) => {
  return (
    <Controller>
        {props.children}
    </Controller>

  );
};

export default VisualLayer;
