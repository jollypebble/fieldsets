import gql from 'graphql-tag';
import { fieldset } from '../fragments';

/**
 * Fetch the Child fieldsets of a given ID.
 */
export const fetchFieldSets = gql`
  query FetchFieldSets @client {
    fieldsets {
      ...fieldset
    }
  }
  ${fieldset}
`;

export const fetchFieldSet = gql`${fieldset}`;
