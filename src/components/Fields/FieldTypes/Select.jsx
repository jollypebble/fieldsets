import React from 'react';

const Select = ({id, name, value, options, onChange}) => {
  const statusOptions = options.map(currentOption => {
    return `<option>${currentOption}</option>`;
  });
  return (
    <React.Fragment>
      <select
        id={id}
        value={value}
        className="field fieldtype-default"
        onChange={onChange}
      >
      {statusOptions}
      </select>
    </React.Fragment>
  );
}

export default Select;
