import React from 'react';
import Select from 'react-dropdown-select';

const DropDown = ({id, view, field, events}) => {
  return (
    <Select
      id={id}
      options={field.meta.data.options}
      className={'fieldtype-select'}
      labelField={field.name}
      valueField={field.value}
      keepSelectedInList={false}
      dropdownHeight={'6em'}
      dropdownHandle={false}
      dropdownGap={0}
      {...events}
    />
  );
}
export default DropDown;
