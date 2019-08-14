import React from 'react';
import {
  TextField
} from 'react-md';

const NULL_VALUES = [0, '', 'none', null];

const Currency = ({id, name, value, options, onChange}) => {
  const inputValue = !NULL_VALUES.includes(value) ? value : '';
  // TODO: Validate proper currency format and add in dollar label
  return (
    <React.Fragment>
      <TextField
        id={`field-${id}`}
        label={name}
        placeholder={value.toString()}
        value={value.toString()}
        className={`field fieldtype-currency field-parent-${id}`}
        onChange={(inputValue) => onChange(inputValue, id)}
      />
    </React.Fragment>
  );
}

export default Currency;
