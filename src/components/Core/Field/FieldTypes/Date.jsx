import React from 'react';
import {
  TextField
} from 'react-md';

const Date = ({id, name, value, account, member, options, onChange}) => {
  return (
    <React.Fragment>
      <TextField
        id={id}
        placeholder={value.toString()}
        value={value}
        className="field fieldtype-default"
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export default Date;
