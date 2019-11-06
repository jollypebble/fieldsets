import React from 'react';

const Text = ({id, view, field, events}) => {
  return (
    <React.Fragment>
      <label for={id}>{field.name}</label>
      <input
        id={id}
        name={id}
        defaultValue={(field.value > 0) ? field.value : ''}
        className={`field fieldtype-${field.type}`}
        type="text"
        {...events}
      />
    </React.Fragment>
  );
}

export default Text;
