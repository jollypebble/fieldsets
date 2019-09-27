import gql from 'graphql-tag';
import { field, fieldset } from '../fragments';

/**
 * Fetch all defined fields
 */
export const fetchAllFields = gql`
  query FetchAllFields @client {
    fields {
      ...field
    }
  }
  ${field}
`;

/**
 * Fetch all the fields of a fieldset
 */
export const fetchFields = gql`
  query FetchFields($id: ID!) {
    fieldsets(id: $id) @client {
      children {
        ...field
      }
    }
  }
  ${field}
`;

export const updateField = gql`
  mutation UpdateField($data: Array) {
    updateField(data: $data) @client {
      id
    }
  }
  ${field}
`;

export const fetchField = gql`${field}`;
