import React from 'react';
import {
  TextField,
  FontIcon
} from 'react-md';

const Currency = ({id, view, field, events}) => {
  // See https://react-md.mlaursen.com/components/text-fields?tab=1#text-field-proptypes-type for valid types.

  let mdtype = 'text';
  let fieldtypeIcon = null
  switch (field.type) {
    case 'currency':
    default:
      mdtype = 'text';
      fieldtypeIcon = 'dollar-sign'
      break;
  }

  return (
    <TextField
      id={id}
      name={id}
      placeholder={field.value.toString()}
      defaultValue={(field.value > 0) ? field.value : ''}
      className={`field fieldtype-${field.type}`}
      type={mdtype} // TODO: Change this to lookup proper type.
      fullWidth={false}
      leftIcon={(fieldtypeIcon) ? <FontIcon iconClassName={`fa fa-${fieldtypeIcon}`} /> : null}
      helpText={field.name}
      {...events}
    />
  );
}

export default Currency;
