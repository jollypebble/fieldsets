import React from 'react';
import {
  TextField
} from 'react-md';

const Currency = ({id, name, value, options, onChange}) => {
  return (
    <React.Fragment>
      <TextField
        id={`field-${id}`}
        label={`${name}`}
        placeholder={`${value}`}
        className={`field fieldtype-currency field-parent-${id}`}
      />
    </React.Fragment>
  );
}

export default Currency;
