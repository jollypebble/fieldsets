import React from 'react';

const Select = ({id, name, value, options, onChange}) => {
  const selectOptions = options.map(currentOption => {
    const selected = (value === currentOption) ? ' selected' : '';
    return `<option${selected}>${currentOption}</option>`;
  });
  return (
    <React.Fragment>
      <select
        id={id}
        value={value}
        className={`field fieldtype-select field-parent-${id}`}
        onChange={onChange}
      >
      <option value=''></option>
      {selectOptions}
      </select>
    </React.Fragment>
  );
}

export default Select;
