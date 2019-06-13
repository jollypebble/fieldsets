import React from 'react';

const Default = ({id, name, value, options, onChange}) => {
  return (
    <React.Fragment>
      <input
        id={id}
        value={value}
        className="field fieldtype-default"
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export default Default;
