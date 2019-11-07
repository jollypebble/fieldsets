import gql from 'graphql-tag';
import { fragments } from '../fragments';

/**
 * Fetch all the fields of a fieldset
 */
export const fetchFields = gql`
  query FetchFields {
    fetchFields @client(always: true)
  }
  ${fragments.field}
`;

export const updateField = gql`
  mutation UpdateField($data: Array) {
    updateField(data: $data) @client(always: true)
  }
  ${fragments.field}
`;

export const fetchField = gql`${fragments.field}`;
