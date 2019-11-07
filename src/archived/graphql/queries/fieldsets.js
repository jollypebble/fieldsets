import gql from 'graphql-tag';
import { fragments } from '../fragments';

/**
 * Fetch fieldsets from active container.
 */
export const fetchFieldSets = gql`
  query FetchFieldSets( $data: Array ) {
    fetchFieldSets(data: $data) @client(always: true) {
      ...fieldset
    }
  }
  ${fragments.fieldset}
`;

export const updateFieldSets = gql`
  mutation UpdateFieldSets($data: Array) {
    updateFieldSets(data: $data) @client(always: true) {
      ...fieldset
    }
  }
  ${fragments.fieldset}
`;


export const updateFieldSet = gql`
  mutation UpdateFieldSet($data: Array) {
    updateFieldSet(data: $data) @client(always: true)
  }
`;

export const fetchFieldSet = gql`${fragments.fieldset}`;
