import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';
import FieldType from './FieldType';
import { updateField } from 'graphql/queries';

/**
 * A field is a single data value in a set.
 */
const Field = ({id, fieldtype, name, account, options}) => {
  const [field, updateData] = useState({});

  const value = field.value;
  const notes = field.notes;

  return (
  <Mutation mutation={updateField} variables={{ data: {id,value} }} awaitRefetchQueries={true}>
    <FieldType
      id={id}
      key={id}
      account={account}
      name={name}
      fieldtype={fieldtype}
      value={value}
      options={{
        ...options
      }}
      onChange={ () => {
        //updateCache({ id: id, type: 'update', data: field });
        updateData({ value, notes });
      } }
    />
  </Mutation>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Field);
