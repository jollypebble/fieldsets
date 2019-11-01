import React from 'react';
import {CustomLabel, DefaultLabel} from './Labels';
import * as CustomLabels from 'components/Sets/Labels';

const SetLabel = (props) => {
  if (props.type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const setlabelClassName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    if ( setlabelClassName in CustomLabels ) {
      return (
        <CustomLabel
          {...props}
        >
          {CustomLabels[setlabelClassName]({...props})}
        </CustomLabel>
      );
    }
  }
  return (
    <DefaultLabel
      {...props}
    >
      {props.children}
    </DefaultLabel>
  );
}

export default SetLabel;
