import React, {useRef} from 'react';
import {
  TextField,
  SelectField,
  FontIcon
} from 'react-md';

const LabelField = ({id, view, value, placeholder, field, events}) => {
  let label = `${field.name}`;

  if ( 'select' === field.type ) {
    return (
      <React.Fragment>
        <SelectField
          id={id}
          defaultValue={field.value}
          menuItems={field.meta.data.options}
          className={`field fieldtype-${field.type}`}
          simplifiedMenu={true}
          position={SelectField.Positions.BELOW}
          {...events}
        />
      </React.Fragment>
    );
  }

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
    <React.Fragment>
      <TextField
        id={id}
        placeholder={field.value.toString()}
        defaultValue={(field.value > 0) ? field.value : ''}
        className={`field fieldtype-${field.type}`}
        type={mdtype} // TODO: Change this to lookup proper type.
        fullWidth={false}
        leftIcon={(fieldtypeIcon) ? <FontIcon iconClassName={`fa fa-${fieldtypeIcon}`} /> : null}
        helpText={label}
        {...events}
      />
    </React.Fragment>
  );
}

export default LabelField;
