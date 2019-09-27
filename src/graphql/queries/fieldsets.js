import gql from 'graphql-tag';
import { fragments } from '../fragments';

/**
 * Fetch children of a parent id.
 */
export const fetchFieldSets = gql`
  query FetchFieldSets {
    fetchFieldSets @client(always:true) {
      ...fieldset
    }
  }
`;

export const updateFieldSets = gql`
  mutation UpdateFieldSets($data: Array) {
    updateFieldSets(data: $data) @client(always: true)
  }
`;

export const updateFieldSet = gql`
  mutation UpdateFieldSet($data: Array) {
    updateFieldSet(data: $data) @client(always: true)
  }
`;

export const fetchFieldSet = gql`${fragments.fieldset}`;
