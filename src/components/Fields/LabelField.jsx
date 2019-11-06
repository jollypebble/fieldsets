import React from 'react';
import { Currency, DropDown } from 'components/Fields';

const LabelField = ({id, view, field, events}) => {
  if ( 'select' === field.type ) {
    return (
      <DropDown
        id={id}
        view={view}
        field={field}
        events={events}
      />
    );
  }

  return (
    <Currency
      id={id}
      view={view}
      field={field}
      events={events}
    />
  );
}

export default LabelField;
