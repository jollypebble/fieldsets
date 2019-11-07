import React from 'react';
import { Currency, DropDown } from 'components/Fields';
import {
  FontIcon
} from 'react-md';
import { Output } from 'components/Core/Field/Views';

const LabelField = ({id, view, field, hasDependencies = false, events}) => {
  if (hasDependencies) {
    return(
      <Output
        id={id}
        view={view}
        field={field}
        events={events}
        label={<span className="output-currency"> <FontIcon iconClassName={`fa fa-dollar-sign`} /> </span>}
      />
    );
  }

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
