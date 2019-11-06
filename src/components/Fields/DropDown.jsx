import React from 'react';
import { SelectField } from 'react-md';

const DropDown = ({id, view, field, events}) => {
  return (
    <SelectField
      id={id}
      defaultValue={field.value}
      menuItems={field.meta.data.options}
      className={`field fieldtype-${field.type}`}
      simplifiedMenu={true}
      position={SelectField.Positions.BELOW}
      {...events}
    />
  );
}
export default DropDown;
